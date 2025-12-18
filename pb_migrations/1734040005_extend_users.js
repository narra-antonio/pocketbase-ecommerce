/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");
  const rolesCollection = app.findCollectionByNameOrId("dom_roles");
  const twoFACollection = app.findCollectionByNameOrId("dom_2fa_methods");

  // Role field
  collection.fields.add(new RelationField({
    name: "role",
    required: true,
    presentable: false,
    collectionId: rolesCollection.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  // Account lock fields
  collection.fields.add(new BoolField({
    name: "account_locked",
    required: false,
    presentable: false
  }));

  collection.fields.add(new DateField({
    name: "locked_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "locked_reason",
    required: false,
    presentable: false,
    max: 500
  }));

  // Failed login tracking
  collection.fields.add(new NumberField({
    name: "failed_login_attempts",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new DateField({
    name: "last_failed_login",
    required: false,
    presentable: false
  }));

  // Password reset fields
  collection.fields.add(new TextField({
    name: "reset_token",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new DateField({
    name: "reset_token_expires",
    required: false,
    presentable: false
  }));

  collection.fields.add(new DateField({
    name: "reset_requested_at",
    required: false,
    presentable: false
  }));

  // 2FA fields
  collection.fields.add(new BoolField({
    name: "twofa_enabled",
    required: false,
    presentable: false
  }));

  collection.fields.add(new RelationField({
    name: "twofa_method",
    required: false,
    presentable: false,
    collectionId: twoFACollection.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new TextField({
    name: "twofa_secret",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new JSONField({
    name: "twofa_backup_codes",
    required: false,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new DateField({
    name: "twofa_verified_at",
    required: false,
    presentable: false
  }));

  // Login tracking
  collection.fields.add(new DateField({
    name: "last_login_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "last_login_ip",
    required: false,
    presentable: false,
    max: 50
  }));

  // Audit fields
  collection.fields.add(new AutodateField({
    name: "created_at",
    onCreate: true,
    onUpdate: false
  }));

  collection.fields.add(new RelationField({
    name: "created_by",
    required: false,
    presentable: false,
    collectionId: collection.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new AutodateField({
    name: "updated_at",
    onCreate: true,
    onUpdate: true
  }));

  collection.fields.add(new RelationField({
    name: "updated_by",
    required: false,
    presentable: false,
    collectionId: collection.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_");

  // Remove custom fields (in reverse order)
  const fieldsToRemove = [
    "updated_by", "updated_at", "created_by", "created_at",
    "last_login_ip", "last_login_at",
    "twofa_verified_at", "twofa_backup_codes", "twofa_secret", "twofa_method",
    "twofa_enabled", "reset_requested_at", "reset_token_expires", "reset_token",
    "last_failed_login", "failed_login_attempts", "locked_reason", "locked_at",
    "account_locked", "role"
  ];

  fieldsToRemove.forEach(fieldName => {
    const field = collection.fields.getByName(fieldName);
    if (field) {
      collection.fields.removeById(field.id);
    }
  });

  app.save(collection);
});
