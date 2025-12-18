# ===========================================
# STAGE 1: Download Pocketbase
# ===========================================
FROM alpine:latest AS downloader

ARG POCKETBASE_VERSION=0.23.4
ARG TARGETARCH

WORKDIR /tmp

# Install download tools
RUN apk add --no-cache \
    curl \
    unzip \
    ca-certificates

# Download and extract Pocketbase
RUN ARCH=${TARGETARCH} && \
    if [ "$ARCH" = "amd64" ]; then ARCH="amd64"; \
    elif [ "$ARCH" = "arm64" ]; then ARCH="arm64"; \
    else echo "Unsupported architecture: $ARCH" && exit 1; fi && \
    curl -fSL "https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_${ARCH}.zip" -o pocketbase.zip && \
    unzip pocketbase.zip && \
    chmod +x pocketbase

# ===========================================
# STAGE 2: Runtime
# ===========================================
FROM alpine:latest

LABEL maintainer="Antonio Narra <antonio@antonionarra.io>"
LABEL description="Production-ready Pocketbase E-commerce Backend for Angular 20 Masterclass"
LABEL version="1.0.0"

# Install runtime dependencies
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    bash \
    curl \
    jq

# Create non-root user for security
RUN addgroup -g 1000 pocketbase && \
    adduser -D -u 1000 -G pocketbase pocketbase

# Set working directory
WORKDIR /app

# Copy Pocketbase binary from downloader stage
COPY --from=downloader /tmp/pocketbase /app/pocketbase

# Copy migrations
COPY --chown=pocketbase:pocketbase pb_migrations /app/pb_migrations

# Create data directory with correct permissions
RUN mkdir -p /pb_data && \
    chown -R pocketbase:pocketbase /pb_data /app

# Switch to non-root user
USER pocketbase

# Expose HTTP port
EXPOSE 8090

# Volume for persistent data
VOLUME ["/pb_data"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1

# Environment variables with defaults
ENV PB_DEBUG=false \
    PB_ENCRYPTION_KEY=

# Entrypoint script to build dynamic command
COPY --chown=pocketbase:pocketbase docker-entrypoint.sh /app/docker-entrypoint.sh

USER root
RUN chmod +x /app/docker-entrypoint.sh
USER pocketbase

ENTRYPOINT ["/app/docker-entrypoint.sh"]
