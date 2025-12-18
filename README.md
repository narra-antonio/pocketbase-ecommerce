# 🛒 Pocketbase E-commerce Backend

Production-ready Pocketbase v0.23 backend for Angular 21 Masterclass e-commerce application.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Default Users](#default-users)
- [Database Schema](#database-schema)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [API Documentation](#api-documentation)
- [Migrations](#migrations)
- [License](#license)

---

## ✨ Features

- **🔐 Complete Authentication System:** User roles, 2FA, OAuth2 ready
- **🛍️ Full E-commerce Schema:** Products, orders, cart, wishlists, reviews
- **💳 Payment Integration:** PayPal ready, extensible payment methods
- **📦 Inventory Management:** Stock tracking, movements history
- **📧 Email System:** SMTP configuration, customizable templates
- **☁️ S3 Storage:** Optional S3-compatible storage for files
- **🔄 Automated Backups:** Scheduled backups with S3 support
- **📊 Comprehensive Logging:** Configurable log retention and levels
- **🚦 Rate Limiting:** Flexible rate limiting rules
- **🎨 Product Images:** Unsplash API integration for demo images
- **🔒 Security:** Encryption support, audit fields, login history

---

## 🏗️ Architecture

### Collections (21 Total)

**Domain Collections (5):**

- `dom_roles` - User roles (admin, office, user)
- `dom_2fa_methods` - 2FA methods (authenticator, sms, email)
- `dom_payment_methods` - Payment methods (credit card, PayPal, bank transfer)
- `dom_discount_types` - Discount types (percentage, fixed)
- `dom_discount_codes` - Discount code definitions

**Core Collections (16):**

- `_pb_users_auth_` - Authentication & security
- `user_profiles` - User profile data (1:1 with users)
- `settings` - Application settings
- `categories` - Product categories (hierarchical)
- `products` - Product catalog
- `user_addresses` - User shipping/billing addresses
- `user_payment_methods` - Saved payment methods
- `cart_items` - Shopping cart
- `orders` - Order management
- `order_items` - Order line items
- `order_status_history` - Order status tracking
- `user_login_history` - Login attempts tracking
- `product_reviews` - Product reviews with helpfulness
- `review_helpfulness` - Review voting
- `user_wishlists` - User wishlists
- `user_notifications` - User notifications
- `stock_movements` - Inventory movements

### Seed Data (7 Migrations)

1. **Essential** - Roles, 2FA methods, payment methods, settings, 3 users with profiles
2. **Categories** - ~35 hierarchical tech categories
3. **Products** - 1000 tech products with Unsplash images
4. **Discount Codes** - Sample discount codes
5. **Domain Seeds** - Additional domain data
6. **Payment Methods** - Extended payment method configurations
7. **Orders** - 5 sample orders with status history and reviews

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository:**

  ```bash
    git clone <repository-url>
    cd pocketbase-ecommerce
  ```

2. **Configure environment:**

  ```bash
    cp .env.example .env
  ```

3. **Generate encryption key (optional but recommended):**

  ```bash
    openssl rand -base64 32
  ```

   Add to `.env`:

```arduino
   PB_ENCRYPTION_KEY=your_generated_key_here
```

4. **Start the application:**

```bash
   docker compose up -d
```

5. **Access Admin UI:**
   - URL: <http://localhost:8090/_/>
   - Email: `admin@ecommerce.local`
   - Password: `Admin123!`

6. **Access API:**

   - Base URL: <http://localhost:8090/api/>
   - Auto-generated docs: <http://localhost:8090/_/#/logs>

---

## 🔧 Environment Variables

### Core Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_APP_NAME` | `TechStore E-commerce` | Application name |
| `PB_APP_URL` | `http://localhost:8090` | Public application URL |
| `PB_DEBUG` | `false` | Enable debug mode (adds `--dev` flag) |
| `PB_ENV` | `development` | Environment (development/production) |

### Encryption

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_ENCRYPTION_KEY` | *(empty)* | 32-character encryption key for settings |

**Generate key:**

```bash
openssl rand -base64 32
```

### SMTP Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_SMTP_ENABLED` | `false` | Enable SMTP |
| `PB_SMTP_HOST` | *(empty)* | SMTP host |
| `PB_SMTP_PORT` | `587` | SMTP port |
| `PB_SMTP_USERNAME` | *(empty)* | SMTP username |
| `PB_SMTP_PASSWORD` | *(empty)* | SMTP password |
| `PB_SMTP_AUTH_METHOD` | `PLAIN` | Auth method (PLAIN/LOGIN) |
| `PB_SMTP_TLS` | `true` | Enable TLS |
| `PB_SMTP_LOCAL_NAME` | *(empty)* | Local name for EHLO/HELO |
| `PB_SENDER_NAME` | `TechStore Support` | Email sender name |
| `PB_SENDER_ADDRESS` | `noreply@techstore.local` | Email sender address |

### S3 Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_S3_ENABLED` | `false` | Enable S3 storage |
| `PB_S3_BUCKET` | *(empty)* | S3 bucket name |
| `PB_S3_REGION` | *(empty)* | S3 region |
| `PB_S3_ENDPOINT` | *(empty)* | S3 endpoint (for S3-compatible services) |
| `PB_S3_ACCESS_KEY` | *(empty)* | S3 access key |
| `PB_S3_SECRET` | *(empty)* | S3 secret key |
| `PB_S3_FORCE_PATH_STYLE` | `false` | Force path-style URLs |

### Backups

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_BACKUPS_CRON` | `0 0 * * *` | Backup cron schedule (daily at midnight) |
| `PB_BACKUPS_CRON_MAX_KEEP` | `3` | Maximum backups to keep |
| `PB_BACKUPS_S3_ENABLED` | `false` | Store backups in S3 |
| `PB_BACKUPS_S3_BUCKET` | *(empty)* | S3 bucket for backups |
| `PB_BACKUPS_S3_REGION` | *(empty)* | S3 region for backups |
| `PB_BACKUPS_S3_ENDPOINT` | *(empty)* | S3 endpoint for backups |
| `PB_BACKUPS_S3_ACCESS_KEY` | *(empty)* | S3 access key for backups |
| `PB_BACKUPS_S3_SECRET` | *(empty)* | S3 secret for backups |

### Logs

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_LOGS_MAX_DAYS` | `7` | Log retention in days |
| `PB_LOGS_MIN_LEVEL` | `0` | Minimum log level (0=debug, 1=info, 2=warn, 3=error) |
| `PB_LOGS_LOG_IP` | `true` | Log IP addresses |
| `PB_LOGS_LOG_AUTH_ID` | `true` | Log authenticated user IDs |

### Rate Limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_RATE_LIMITS_ENABLED` | `false` | Enable rate limiting |
| `PB_RATE_LIMITS_RULES` | *(empty)* | Rate limit rules (see format below) |

**Rate Limit Rules Format:**

```arduino
label|audience|duration|maxRequests
```

**Example:**

```env
PB_RATE_LIMITS_RULES=*:auth||3|2;*:create||5|20;/api/batch||1|3;/api/||10|300
```

Means:

- Auth endpoints: max 2 requests every 3 seconds
- Create endpoints: max 20 requests every 5 seconds
- Batch endpoint: max 3 requests every 1 second
- All API: max 300 requests every 10 seconds

### Trusted Proxy

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_TRUSTED_PROXY_HEADERS` | *(empty)* | Comma-separated proxy headers (e.g., `X-Real-IP,X-Forwarded-For`) |
| `PB_TRUSTED_PROXY_USE_LEFTMOST_IP` | `false` | Use leftmost IP from proxy headers |

### Batch Requests

| Variable | Default | Description |
|----------|---------|-------------|
| `PB_BATCH_ENABLED` | `true` | Enable batch requests |
| `PB_BATCH_MAX_REQUESTS` | `100` | Max requests per batch |
| `PB_BATCH_TIMEOUT` | `120` | Batch timeout in seconds |

### Unsplash API (Optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `UNSPLASH_ACCESS_KEY` | *(empty)* | Unsplash API access key for product images |
| `UNSPLASH_SECRET_KEY` | *(empty)* | Unsplash API secret key |

Get your keys at: <https://unsplash.com/developers>

---

## 👥 Default Users

Three users are created automatically on first migration:

### 1. Admin User

- **Email:** `admin@ecommerce.local`
- **Password:** `Admin123!`
- **Role:** Admin
- **Profile:** Mario Admin, +39 333 1234567
- **Permissions:** Full system access

### 2. Office User

- **Email:** `office@ecommerce.local`
- **Password:** `Office123!`
- **Role:** Office
- **Profile:** Office Staff, +39 333 7654321
- **Permissions:** Order management, inventory

### 3. Regular User

- **Email:** `user@ecommerce.local`
- **Password:** `User123!`
- **Role:** User
- **Profile:** Mario Rossi, +39 333 9876543
- **Sample Data:** 5 orders, 1 review, saved address and payment method

---

## 📊 Database Schema

### User Management

```arduino
_pb_users_auth_ (1) ──────┬──────→ (1) user_profiles
                          ├──────→ (N) user_addresses
                          ├──────→ (N) user_payment_methods
                          ├──────→ (N) user_login_history
                          ├──────→ (N) user_wishlists
                          ├──────→ (N) user_notifications
                          └──────→ (N) orders
```

### Product & Categories

```arduino
categories (1) ────→ (N) categories (hierarchical)
           (1) ────→ (N) products
           
products (1) ──────→ (N) product_reviews
         (1) ──────→ (N) order_items
         (1) ──────→ (N) cart_items
         (1) ──────→ (N) user_wishlists
         (1) ──────→ (N) stock_movements
```

### Orders

```arduino
orders (1) ────────→ (N) order_items
       (1) ────────→ (N) order_status_history
       (N) ←──────→ (1) user_addresses (shipping & billing)
       (N) ←──────→ (1) dom_payment_methods
```

### Reviews

```arduino
product_reviews (1) ────→ (N) review_helpfulness
```

---

## 💻 Development

### Local Development (without Docker)

1. **Download Pocketbase:**

```bash
   # macOS/Linux (ARM64)
   curl -fSL https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_darwin_arm64.zip -o pocketbase.zip
   unzip pocketbase.zip
   chmod +x pocketbase
   
   # macOS/Linux (AMD64)
   curl -fSL https://github.com/pocketbase/pocketbase/releases/download/v0.23.4/pocketbase_0.23.4_linux_amd64.zip -o pocketbase.zip
   unzip pocketbase.zip
   chmod +x pocketbase
```

2. **Run with auto-migrations:**

```bash
   ./pocketbase serve \
     --http=0.0.0.0:8092 \
     --dir=./pb_data \
     --publicDir=./pb_public \
     --hooksDir=./pb_hooks \
     --migrationsDir=./pb_migrations \
     --automigrate
```

3. **Run with debug mode:**

```bash
   ./pocketbase serve --dev \
     --http=0.0.0.0:8092 \
     --dir=./pb_data \
     --publicDir=./pb_public \
     --hooksDir=./pb_hooks \
     --migrationsDir=./pb_migrations \
     --automigrate
```

### Reset Database

```bash
rm -rf pb_data
./pocketbase serve --automigrate
```

### Manual Migration Run

```bash
./pocketbase migrate up
./pocketbase migrate down 1  # Rollback last migration
```

### Docker Development

```bash
# Build image
docker compose build

# Start with logs
docker compose up

# Start detached
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down

# Restart
docker compose restart

# Remove volumes (reset database)
docker compose down -v
```

---

## 🚀 Production Deployment

### Docker Compose Production

1. **Update `.env` for production:**

```env
   PB_APP_URL=https://api.yourdomain.com
   PB_DEBUG=false
   PB_ENV=production
   PB_ENCRYPTION_KEY=<your-32-char-key>
   
   # Enable SMTP
   PB_SMTP_ENABLED=true
   PB_SMTP_HOST=smtp.sendgrid.net
   PB_SMTP_USERNAME=apikey
   PB_SMTP_PASSWORD=<your-sendgrid-key>
   
   # Enable S3
   PB_S3_ENABLED=true
   PB_S3_BUCKET=your-bucket
   PB_S3_REGION=eu-west-1
   PB_S3_ACCESS_KEY=<your-key>
   PB_S3_SECRET=<your-secret>
   
   # Enable backups to S3
   PB_BACKUPS_S3_ENABLED=true
   PB_BACKUPS_S3_BUCKET=your-backups-bucket
   
   # Enable rate limiting
   PB_RATE_LIMITS_ENABLED=true
   PB_RATE_LIMITS_RULES=*:auth||3|2;*:create||5|20;/api/||10|300
```

2. **Deploy:**

```bash
   docker compose up -d
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:8090;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support for realtime
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Update `.env`:

```env
PB_TRUSTED_PROXY_HEADERS=X-Real-IP,X-Forwarded-For
```

### Backup Strategy

**Automated Backups:**

- Set `PB_BACKUPS_CRON=0 2 * * *` (daily at 2 AM)
- Set `PB_BACKUPS_CRON_MAX_KEEP=7` (keep 7 days)
- Enable S3 backup storage

**Manual Backup:**

```bash
# Create backup via API
curl -X POST http://localhost:8090/api/backups \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"

# Download backup
docker compose cp pocketbase:/pb_data/backups ./backups
```

**Restore from Backup:**

```bash
# Stop container
docker compose down

# Restore pb_data
unzip backup.zip -d pb_data

# Start container
docker compose up -d
```

---

## 📚 API Documentation

### Auto-Generated Documentation

Access interactive API docs at:

```arduino
http://localhost:8090/_/#/logs
```

### Base URL

```arduino
http://localhost:8090/api/
```

### Authentication

**Admin Authentication:**

```bash
curl -X POST http://localhost:8090/api/admins/auth-with-password \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "admin@ecommerce.local",
    "password": "Admin123!"
  }'
```

**User Authentication:**

```bash
curl -X POST http://localhost:8090/api/collections/_pb_users_auth_/auth-with-password \
  -H "Content-Type: application/json" \
  -d '{
    "identity": "user@ecommerce.local",
    "password": "User123!"
  }'
```

### Common Endpoints

**Get Products:**

```bash
curl http://localhost:8090/api/collections/products/records
```

**Get Categories:**

```bash
curl http://localhost:8090/api/collections/categories/records
```

**Get User Orders:**

```bash
curl http://localhost:8090/api/collections/orders/records?filter=(user='USER_ID') \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Create Cart Item:**

```bash
curl -X POST http://localhost:8090/api/collections/cart_items/records \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "user": "USER_ID",
    "product": "PRODUCT_ID",
    "quantity": 2
  }'
```

### Realtime Subscriptions

```javascript
import PocketBase from 'pocketbase'

const pb = new PocketBase('http://localhost:8090')

// Subscribe to order updates
pb.collection('orders').subscribe('*', (e) => {
  console.log(e.action) // 'create', 'update', 'delete'
  console.log(e.record)
})

// Subscribe to specific order
pb.collection('orders').subscribe('ORDER_ID', (e) => {
  console.log(e.record)
})
```

---

## 🔄 Migrations

### Migration List (28 Total)

**Collections (21):**

1. `1733XXXXXX_created_dom_roles.js`
2. `1733XXXXXX_created_dom_2fa_methods.js`
3. `1733XXXXXX_created_dom_payment_methods.js`
4. `1733XXXXXX_created_dom_discount_types.js`
5. `1733XXXXXX_updated_pb_users_auth.js` - Extended auth collection
6. `1733XXXXXX_created_settings.js`
7. `1733XXXXXX_created_categories.js`
8. `1733XXXXXX_created_products.js`
9. `1733XXXXXX_created_user_addresses.js`
10. `1733XXXXXX_created_user_payment_methods.js`
11. `1733XXXXXX_created_cart_items.js`
12. `1733XXXXXX_created_orders.js`
13. `1733XXXXXX_created_order_items.js`
14. `1733XXXXXX_created_order_status_history.js`
15. `1733XXXXXX_created_user_login_history.js`
16. `1733XXXXXX_created_product_reviews.js`
17. `1733XXXXXX_created_review_helpfulness.js`
18. `1733XXXXXX_created_user_wishlists.js`
19. `1733XXXXXX_created_user_notifications.js`
20. `1733XXXXXX_created_stock_movements.js`
21. `1733XXXXXX_created_user_profiles.js`

**Seeds (7):**
22. `1733XXXXXX_seed_essential.js` - Roles, 2FA, payment methods, settings, 3 users + profiles
23. `1733XXXXXX_seed_categories.js` - ~35 hierarchical tech categories
24. `1733XXXXXX_seed_products.js` - 1000 products with Unsplash images
25. `1733XXXXXX_seed_discount_codes.js`
26. `1733XXXXXX_seed_dom_discount_codes.js`
27. `1733XXXXXX_seed_dom_payment_methods.js`
28. `1733XXXXXX_seed_orders_and_reviews.js` - 5 orders with status history + 1 review

### Migration Order

Migrations are executed in filename order. All collection migrations must complete before seed migrations.

---

## 📝 License

MIT License - see LICENSE file for details.

---

## 🤝 Contributing

This is a reference implementation for the Angular 21 Masterclass. Feel free to fork and customize for your needs.

---

## 📧 Support

For issues related to this backend implementation, please open an issue on GitHub.

For Pocketbase-specific questions, refer to the [official documentation](https://pocketbase.io/docs/).

---

**Built with ❤️ by Antonio Narra for Angular 21 Masterclass**
