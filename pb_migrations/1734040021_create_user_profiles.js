/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "user_profiles",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  // User relation (1:1)
  collection.fields.add(new RelationField({
    name: "user",
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: true,
    maxSelect: 1
  }));

  // Account type
  collection.fields.add(new SelectField({
    name: "account_type",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: ["individual", "business"]
  }));

  // Basic info
  collection.fields.add(new TextField({
    name: "first_name",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "last_name",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "phone",
    required: false,
    presentable: false,
    max: 20
  }));

  collection.fields.add(new FileField({
    name: "avatar",
    required: false,
    presentable: false,
    maxSelect: 1,
    maxSize: 2097152,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    thumbs: ["100x100", "200x200"],
    protected: false
  }));

  // Tax/Legal fields
  collection.fields.add(new TextField({
    name: "tax_code",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "vat_number",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "company_name",
    required: false,
    presentable: false,
    max: 200
  }));

  collection.fields.add(new DateField({
    name: "date_of_birth",
    required: false,
    presentable: false
  }));

  // Preferences
  collection.fields.add(new SelectField({
    name: "language",
    required: false,
    presentable: false,
    maxSelect: 1,
    values: ["it", "en", "de", "fr", "es"]
  }));

  collection.fields.add(new SelectField({
    name: "currency",
    required: false,
    presentable: false,
    maxSelect: 1,
    values: ["EUR", "USD", "GBP"]
  }));

  collection.fields.add(new BoolField({
    name: "newsletter_enabled",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "marketing_emails",
    required: false,
    presentable: false
  }));

  // Legal acceptance
  collection.fields.add(new BoolField({
    name: "privacy_accepted",
    required: true,
    presentable: false
  }));

  collection.fields.add(new DateField({
    name: "privacy_accepted_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "privacy_version",
    required: false,
    presentable: false,
    max: 20
  }));

  collection.fields.add(new BoolField({
    name: "terms_accepted",
    required: true,
    presentable: false
  }));

  collection.fields.add(new DateField({
    name: "terms_accepted_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "terms_version",
    required: false,
    presentable: false,
    max: 20
  }));

  // Social/Optional
  collection.fields.add(new TextField({
    name: "bio",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new URLField({
    name: "website",
    required: false,
    presentable: false
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
    collectionId: users.id,
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
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  // Indexes
  collection.indexes = [
    "CREATE UNIQUE INDEX idx_user_profiles_user ON user_profiles (user)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_profiles");
  app.delete(collection);
});
