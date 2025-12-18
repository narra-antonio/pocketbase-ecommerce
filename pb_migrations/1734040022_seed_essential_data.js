/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {

  // ========================================
  // 1. SEED DOM_ROLES
  // ========================================
  const rolesCollection = app.findCollectionByNameOrId("dom_roles");

  // User role
  const userRole = new Record(rolesCollection, {
    name: "User",
    slug: "user",
    description: "Standard user with basic permissions",
    permissions: {
      can_place_orders: true,
      can_view_own_orders: true,
      can_manage_addresses: true,
      can_manage_payment_methods: true,
      can_write_reviews: true,
      can_manage_wishlist: true
    },
    sort_order: 1,
    active: true
  });
  app.save(userRole);

  // Office role
  const officeRole = new Record(rolesCollection, {
    name: "Office",
    slug: "office",
    description: "Office staff with order management permissions",
    permissions: {
      can_view_all_orders: true,
      can_update_order_status: true,
      can_add_tracking: true,
      can_process_refunds: true,
      can_view_customers: true,
      can_moderate_reviews: true,
      can_view_analytics: true
    },
    sort_order: 2,
    active: true
  });
  app.save(officeRole);

  // Admin role
  const adminRole = new Record(rolesCollection, {
    name: "Admin",
    slug: "admin",
    description: "Administrator with full system access",
    permissions: {
      can_manage_products: true,
      can_manage_categories: true,
      can_manage_users: true,
      can_manage_settings: true,
      can_view_analytics: true,
      can_manage_discount_codes: true,
      can_manage_payment_methods: true,
      can_manage_roles: true,
      full_access: true
    },
    sort_order: 3,
    active: true
  });
  app.save(adminRole);

  // ========================================
  // 2. SEED DOM_2FA_METHODS
  // ========================================
  const twoFACollection = app.findCollectionByNameOrId("dom_2fa_methods");

  const authenticatorMethod = new Record(twoFACollection, {
    name: "Authenticator App",
    slug: "authenticator",
    description: "Use Google Authenticator, Authy, or similar apps",
    icon: "smartphone",
    requires_setup: true,
    active: true,
    sort_order: 1
  });
  app.save(authenticatorMethod);

  const smsMethod = new Record(twoFACollection, {
    name: "SMS",
    slug: "sms",
    description: "Receive verification codes via SMS",
    icon: "message-square",
    requires_setup: true,
    active: true,
    sort_order: 2
  });
  app.save(smsMethod);

  const emailMethod = new Record(twoFACollection, {
    name: "Email",
    slug: "email",
    description: "Receive verification codes via email",
    icon: "mail",
    requires_setup: false,
    active: true,
    sort_order: 3
  });
  app.save(emailMethod);

  // ========================================
  // 3. SEED DOM_PAYMENT_METHODS
  // ========================================
  const paymentMethodsCollection = app.findCollectionByNameOrId("dom_payment_methods");

  const paypalMethod = new Record(paymentMethodsCollection, {
    name: "PayPal",
    slug: "paypal",
    description: "Pay securely with PayPal",
    icon: "paypal",
    config_key: "paypal_config",
    requires_user_data: false,
    is_sandbox: true,
    active: true,
    sort_order: 1
  });
  app.save(paypalMethod);

  const creditCardMethod = new Record(paymentMethodsCollection, {
    name: "Credit Card",
    slug: "credit_card",
    description: "Pay with Visa, Mastercard, or American Express",
    icon: "credit-card",
    config_key: "stripe_config",
    requires_user_data: true,
    is_sandbox: false,
    active: false,
    sort_order: 2
  });
  app.save(creditCardMethod);

  const bankTransferMethod = new Record(paymentMethodsCollection, {
    name: "Bank Transfer",
    slug: "bank_transfer",
    description: "Direct bank transfer",
    icon: "building",
    config_key: null,
    requires_user_data: false,
    is_sandbox: false,
    active: false,
    sort_order: 3
  });
  app.save(bankTransferMethod);

  // ========================================
  // 4. SEED SETTINGS
  // ========================================
  const settingsCollection = app.findCollectionByNameOrId("settings");

  // PayPal configuration
  const paypalSettings = new Record(settingsCollection, {
    key: "paypal_config",
    value: {
      client_id: "",
      secret: "",
      mode: "sandbox",
      webhook_url: ""
    },
    description: "PayPal payment gateway configuration",
    active: true
  });
  app.save(paypalSettings);

  // Site settings
  const siteSettings = new Record(settingsCollection, {
    key: "site_settings",
    value: {
      site_name: "TechStore",
      site_url: "http://localhost:8090",
      tax_rate: 0.22,
      currency: "EUR",
      currency_symbol: "€",
      default_shipping_cost: 9.99,
      free_shipping_threshold: 50.00
    },
    description: "General site configuration",
    active: true
  });
  app.save(siteSettings);

  // Email settings
  const emailSettings = new Record(settingsCollection, {
    key: "email_settings",
    value: {
      smtp_host: "",
      smtp_port: 587,
      smtp_username: "",
      smtp_password: "",
      from_email: "noreply@techstore.local",
      from_name: "TechStore"
    },
    description: "Email server configuration",
    active: false
  });
  app.save(emailSettings);

  // ========================================
  // 5. CREATE USERS
  // ========================================
  const usersCollection = app.findCollectionByNameOrId("_pb_users_auth_");
  const profilesCollection = app.findCollectionByNameOrId("user_profiles");

  // Admin user
  const adminUser = new Record(usersCollection, {
    email: "admin@ecommerce.local",
    password: "Admin123!",
    passwordConfirm: "Admin123!",
    verified: true,
    role: adminRole.id,
    account_locked: false,
    failed_login_attempts: 0,
    twofa_enabled: false,
    created_by: this.id,
    updated_by: this.id
  });
  app.save(adminUser);

  // Admin profile
  const adminProfile = new Record(profilesCollection, {
    user: adminUser.id,
    account_type: "individual",
    first_name: "Admin",
    last_name: "User",
    phone: "+39 333 1234567",
    privacy_accepted: true,
    privacy_accepted_at: new Date().toISOString(),
    privacy_version: "v1.0",
    terms_accepted: true,
    terms_accepted_at: new Date().toISOString(),
    terms_version: "v1.0",
    language: "it",
    currency: "EUR",
    newsletter_enabled: false,
    marketing_emails: false,
    created_by: adminUser.id,
    updated_by: adminUser.id
  });
  app.save(adminProfile);
  console.log("passo 1");
  // Office user
  const officeUser = new Record(usersCollection, {
    email: "office@ecommerce.local",
    password: "Office123!",
    passwordConfirm: "Office123!",
    verified: true,
    role: officeRole.id,
    account_locked: false,
    failed_login_attempts: 0,
    twofa_enabled: false,
    created_by: adminUser.id,
    updated_by: adminUser.id
  });
  app.save(officeUser);
  console.log("passo 2");

  // Office profile
  const officeProfile = new Record(profilesCollection, {
    user: officeUser.id,
    account_type: "individual",
    first_name: "Office",
    last_name: "Staff",
    phone: "+39 333 7654321",
    privacy_accepted: true,
    privacy_accepted_at: new Date().toISOString(),
    privacy_version: "v1.0",
    terms_accepted: true,
    terms_accepted_at: new Date().toISOString(),
    terms_version: "v1.0",
    language: "it",
    currency: "EUR",
    newsletter_enabled: false,
    marketing_emails: false,
    created_by: adminUser.id,
    updated_by: adminUser.id
  });
  app.save(officeProfile);
  console.log("passo 3");

  // Regular user
  const regularUser = new Record(usersCollection, {
    email: "user@ecommerce.local",
    password: "User123!",
    passwordConfirm: "User123!",
    verified: true,
    role: userRole.id,
    account_locked: false,
    failed_login_attempts: 0,
    twofa_enabled: false,
    created_by: adminUser.id,
    updated_by: adminUser.id
  });
  app.save(regularUser);
  console.log("passo 4");

  // Regular user profile
  const regularProfile = new Record(profilesCollection, {
    user: regularUser.id,
    account_type: "individual",
    first_name: "Mario",
    last_name: "Rossi",
    phone: "+39 333 9876543",
    privacy_accepted: true,
    privacy_accepted_at: new Date().toISOString(),
    privacy_version: "v1.0",
    terms_accepted: true,
    terms_accepted_at: new Date().toISOString(),
    terms_version: "v1.0",
    language: "it",
    currency: "EUR",
    newsletter_enabled: true,
    marketing_emails: true,
    created_by: regularUser.id,
    updated_by: regularUser.id
  });
  app.save(regularProfile);
  console.log("passo 5");

  console.log("✅ Essential data seeded successfully!");
  console.log("");
  console.log("👤 USERS CREATED:");
  console.log("📧 Admin: admin@ecommerce.local / Admin123!");
  console.log("📧 Office: office@ecommerce.local / Office123!");
  console.log("📧 User: user@ecommerce.local / User123!");

}, (app) => {

  // Delete in reverse order to avoid foreign key constraints

  // Delete user profiles
  const profileEmails = ["admin@ecommerce.local", "office@ecommerce.local", "user@ecommerce.local"];
  profileEmails.forEach(email => {
    try {
      const user = app.findAuthRecordByEmail("_pb_users_auth_", email);
      const profile = app.findFirstRecordByFilter("user_profiles", `user = "${user.id}"`);
      app.deleteRecord(profile);
    } catch (e) {
      console.log(`Profile for ${email} not found or already deleted`);
    }
  });

  // Delete users
  profileEmails.forEach(email => {
    try {
      const user = app.findAuthRecordByEmail("_pb_users_auth_", email);
      app.deleteRecord(user);
    } catch (e) {
      console.log(`User ${email} not found or already deleted`);
    }
  });

  // Delete settings
  const settingsKeys = ["paypal_config", "site_settings", "email_settings"];
  settingsKeys.forEach(key => {
    try {
      const setting = app.findFirstRecordByFilter("settings", `key = "${key}"`);
      app.deleteRecord(setting);
    } catch (e) {
      console.log(`Setting ${key} not found or already deleted`);
    }
  });

  // Delete payment methods
  const paymentSlugs = ["paypal", "credit_card", "bank_transfer"];
  paymentSlugs.forEach(slug => {
    try {
      const method = app.findFirstRecordByFilter("dom_payment_methods", `slug = "${slug}"`);
      app.deleteRecord(method);
    } catch (e) {
      console.log(`Payment method ${slug} not found or already deleted`);
    }
  });

  // Delete 2FA methods
  const twofaSlugs = ["authenticator", "sms", "email"];
  twofaSlugs.forEach(slug => {
    try {
      const method = app.findFirstRecordByFilter("dom_2fa_methods", `slug = "${slug}"`);
      app.deleteRecord(method);
    } catch (e) {
      console.log(`2FA method ${slug} not found or already deleted`);
    }
  });

  // Delete roles
  const roleSlugs = ["user", "office", "admin"];
  roleSlugs.forEach(slug => {
    try {
      const role = app.findFirstRecordByFilter("dom_roles", `slug = "${slug}"`);
      app.deleteRecord(role);
    } catch (e) {
      console.log(`Role ${slug} not found or already deleted`);
    }
  });

  console.log("🔄 Essential data rollback completed!");
});
