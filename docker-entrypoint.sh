#!/bin/bash
set -e

# Build base command
CMD="/app/pocketbase serve"

# Add --dev if debug is enabled
if [ "$PB_DEBUG" = "true" ]; then
    CMD="$CMD --dev"
fi

# Add encryption if key is set
if [ -n "$PB_ENCRYPTION_KEY" ]; then
    CMD="$CMD --encryptionEnv=PB_ENCRYPTION_KEY"
fi

# Add standard flags
CMD="$CMD --http=0.0.0.0:8090"
CMD="$CMD --dir=/pb_data"
CMD="$CMD --publicDir=/pb_public"
CMD="$CMD --hooksDir=/app/pb_hooks"
CMD="$CMD --migrationsDir=/app/pb_migrations"
CMD="$CMD --automigrate"

# Execute command
echo "Starting Pocketbase with: $CMD"
exec $CMD
