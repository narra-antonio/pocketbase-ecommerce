/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const products = app.findCollectionByNameOrId("products");
  const orders = app.findCollectionByNameOrId("orders");

  const collection = new Collection({
    name: "product_reviews",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new RelationField({
    name: "product",
    required: true,
    presentable: false,
    collectionId: products.id,
    cascadeDelete: true,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new RelationField({
    name: "user",
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new RelationField({
    name: "order",
    required: false,
    presentable: false,
    collectionId: orders.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["order_number"]
  }));

  collection.fields.add(new NumberField({
    name: "rating",
    required: true,
    presentable: false,
    min: 1,
    max: 5,
    noDecimal: true
  }));

  collection.fields.add(new TextField({
    name: "title",
    required: false,
    presentable: true,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "comment",
    required: true,
    presentable: false,
    max: 2000
  }));

  collection.fields.add(new SelectField({
    name: "status",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "pending",
      "approved",
      "rejected"
    ]
  }));

  collection.fields.add(new RelationField({
    name: "moderated_by",
    required: false,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new DateField({
    name: "moderated_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "moderation_notes",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new NumberField({
    name: "helpful_count",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "not_helpful_count",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new FileField({
    name: "images",
    required: false,
    presentable: false,
    maxSelect: 5,
    maxSize: 2097152,
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    thumbs: ["200x200"],
    protected: false
  }));

  collection.fields.add(new BoolField({
    name: "verified_purchase",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "active",
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

  collection.indexes = [
    "CREATE INDEX idx_product_reviews_product_status ON product_reviews (product, status)",
    "CREATE UNIQUE INDEX idx_product_reviews_user_product ON product_reviews (user, product)",
    "CREATE INDEX idx_product_reviews_verified ON product_reviews (verified_purchase)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("product_reviews");
  app.delete(collection);
});
