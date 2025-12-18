/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  console.log("🚀 Initial settings migration running...")

  const settings = app.settings()

  // ===========================================
  // META CONFIGURATION
  // ===========================================
  settings.meta.appName = process.env.PB_APP_NAME || "TechStore E-commerce"
  settings.meta.appURL = process.env.PB_APP_URL || "http://localhost:8090"
  settings.meta.senderName = process.env.PB_SENDER_NAME || "TechStore Support"
  settings.meta.senderAddress = process.env.PB_SENDER_ADDRESS || "noreply@techstore.local"
  settings.meta.hideControls = false

  // ===========================================
  // SMTP CONFIGURATION
  // ===========================================
  settings.smtp.enabled = process.env.PB_SMTP_ENABLED === "true"
  settings.smtp.host = process.env.PB_SMTP_HOST || ""
  settings.smtp.port = parseInt(process.env.PB_SMTP_PORT || "587")
  settings.smtp.username = process.env.PB_SMTP_USERNAME || ""
  settings.smtp.password = process.env.PB_SMTP_PASSWORD || ""
  settings.smtp.authMethod = process.env.PB_SMTP_AUTH_METHOD || "PLAIN"
  settings.smtp.tls = process.env.PB_SMTP_TLS !== "false"
  settings.smtp.localName = process.env.PB_SMTP_LOCAL_NAME || ""

  // ===========================================
  // S3 STORAGE CONFIGURATION
  // ===========================================
  settings.s3.enabled = process.env.PB_S3_ENABLED === "true"
  settings.s3.bucket = process.env.PB_S3_BUCKET || ""
  settings.s3.region = process.env.PB_S3_REGION || ""
  settings.s3.endpoint = process.env.PB_S3_ENDPOINT || ""
  settings.s3.accessKey = process.env.PB_S3_ACCESS_KEY || ""
  settings.s3.secret = process.env.PB_S3_SECRET || ""
  settings.s3.forcePathStyle = process.env.PB_S3_FORCE_PATH_STYLE === "true"

  // ===========================================
  // BACKUPS CONFIGURATION
  // ===========================================
  settings.backups.cron = process.env.PB_BACKUPS_CRON || "0 0 * * *"
  settings.backups.cronMaxKeep = parseInt(process.env.PB_BACKUPS_CRON_MAX_KEEP || "3")
  settings.backups.s3.enabled = process.env.PB_BACKUPS_S3_ENABLED === "true"
  settings.backups.s3.bucket = process.env.PB_BACKUPS_S3_BUCKET || ""
  settings.backups.s3.region = process.env.PB_BACKUPS_S3_REGION || ""
  settings.backups.s3.endpoint = process.env.PB_BACKUPS_S3_ENDPOINT || ""
  settings.backups.s3.accessKey = process.env.PB_BACKUPS_S3_ACCESS_KEY || ""
  settings.backups.s3.secret = process.env.PB_BACKUPS_S3_SECRET || ""

  // ===========================================
  // LOGS CONFIGURATION
  // ===========================================
  settings.logs.maxDays = parseInt(process.env.PB_LOGS_MAX_DAYS || "7")
  settings.logs.minLevel = parseInt(process.env.PB_LOGS_MIN_LEVEL || "0")
  settings.logs.logIP = process.env.PB_LOGS_LOG_IP !== "false"
  settings.logs.logAuthId = process.env.PB_LOGS_LOG_AUTH_ID !== "false"

  // ===========================================
  // RATE LIMITING CONFIGURATION
  // ===========================================
  settings.rateLimits.enabled = process.env.PB_RATE_LIMITS_ENABLED === "true"

  // Parse rate limit rules if provided
  // Format: label|audience|duration|maxRequests (semicolon-separated)
  // Example: *:auth||3|2;*:create||5|20
  if (process.env.PB_RATE_LIMITS_RULES) {
    const rules = []
    const ruleStrings = process.env.PB_RATE_LIMITS_RULES.split(";")

    ruleStrings.forEach(ruleStr => {
      const parts = ruleStr.trim().split("|")
      if (parts.length === 4) {
        rules.push({
          label: parts[0],
          audience: parts[1],
          duration: parseInt(parts[2]),
          maxRequests: parseInt(parts[3])
        })
      }
    })

    if (rules.length > 0) {
      settings.rateLimits.rules = rules
    }
  }

  // ===========================================
  // TRUSTED PROXY CONFIGURATION
  // ===========================================
  if (process.env.PB_TRUSTED_PROXY_HEADERS) {
    settings.trustedProxy.headers = process.env.PB_TRUSTED_PROXY_HEADERS.split(",").map(h => h.trim())
  } else {
    settings.trustedProxy.headers = []
  }
  settings.trustedProxy.useLeftmostIP = process.env.PB_TRUSTED_PROXY_USE_LEFTMOST_IP === "true"

  // ===========================================
  // BATCH CONFIGURATION
  // ===========================================
  settings.batch.enabled = process.env.PB_BATCH_ENABLED !== "false"
  settings.batch.maxRequests = parseInt(process.env.PB_BATCH_MAX_REQUESTS || "100")
  settings.batch.timeout = parseInt(process.env.PB_BATCH_TIMEOUT || "120")

  // Save all settings
  app.save(settings)
  console.log(`✅ Settings configured: ${settings.meta.appName}`)
  console.log(`   - SMTP: ${settings.smtp.enabled ? 'Enabled' : 'Disabled'}`)
  console.log(`   - S3: ${settings.s3.enabled ? 'Enabled' : 'Disabled'}`)
  console.log(`   - Backups: ${settings.backups.cron} (keep ${settings.backups.cronMaxKeep})`)
  console.log(`   - Rate Limits: ${settings.rateLimits.enabled ? 'Enabled' : 'Disabled'}`)
  console.log(`   - Batch: ${settings.batch.enabled ? 'Enabled' : 'Disabled'}`)

  // ===========================================
  // CREATE SUPERUSER IF NOT EXISTS
  // ===========================================
  const superusers = app.findCollectionByNameOrId("_superusers")
  const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || "admin@ecommerce.local"
  const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || "Admin123!"

  try {
    app.findAuthRecordByEmail("_superusers", adminEmail)
    console.log("ℹ️  Superuser already exists")
  } catch (e) {
    const admin = new Record(superusers)
    admin.set("email", adminEmail)
    admin.set("password", adminPassword)
    app.save(admin)
    console.log(`✅ Superuser created: ${adminEmail}`)
  }

  console.log("🎉 Initial settings migration completed!")
})
