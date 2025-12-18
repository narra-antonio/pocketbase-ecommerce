/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "categories",
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
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "slug",
    required: true,
    presentable: false,
    max: 100,
    pattern: "^[a-z0-9-]+$"
  }));

  collection.fields.add(new RelationField({
    name: "parent",
    required: false,
    presentable: false,
    collectionId: collection.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new TextField({
    name: "description",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new URLField({
    name: "image_url",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
  }));

  collection.fields.add(new NumberField({
    name: "sort_order",
    required: false,
    presentable: false,
    noDecimal: true
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
    "CREATE UNIQUE INDEX idx_categories_slug ON categories (slug)",
    "CREATE INDEX idx_categories_parent_active ON categories (parent, active)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("categories");
  app.delete(collection);
});
