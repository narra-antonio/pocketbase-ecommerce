/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const categories = app.findCollectionByNameOrId("categories");

  const collection = new Collection({
    name: "products",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new TextField({
    name: "name",
    required: true,
    presentable: true,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "slug",
    required: true,
    presentable: false,
    max: 200,
    pattern: "^[a-z0-9-]+$"
  }));

  collection.fields.add(new TextField({
    name: "description",
    required: true,
    presentable: false,
    max: 2000
  }));

  collection.fields.add(new NumberField({
    name: "price",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "compare_at_price",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new RelationField({
    name: "category",
    required: true,
    presentable: false,
    collectionId: categories.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new URLField({
    name: "image_url",
    required: false,
    presentable: false
  }));

  collection.fields.add(new JSONField({
    name: "image_urls",
    required: false,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new NumberField({
    name: "stock",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new TextField({
    name: "sku",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "brand",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new JSONField({
    name: "specifications",
    required: false,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new BoolField({
    name: "featured",
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
    "CREATE UNIQUE INDEX idx_products_slug ON products (slug)",
    "CREATE UNIQUE INDEX idx_products_sku ON products (sku) WHERE sku IS NOT NULL",
    "CREATE INDEX idx_products_category_active ON products (category, active)",
    "CREATE INDEX idx_products_featured_active ON products (featured, active)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("products");
  app.delete(collection);
});
