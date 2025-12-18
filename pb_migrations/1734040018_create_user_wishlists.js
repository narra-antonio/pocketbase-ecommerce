/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const products = app.findCollectionByNameOrId("products");

  const collection = new Collection({
    name: "user_wishlists",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new RelationField({
    name: "user",
    required: false,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new RelationField({
    name: "product",
    required: true,
    presentable: false,
    collectionId: products.id,
    cascadeDelete: true,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new TextField({
    name: "notes",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new SelectField({
    name: "priority",
    required: false,
    presentable: false,
    maxSelect: 1,
    values: [
      "low",
      "medium",
      "high"
    ]
  }));

  collection.fields.add(new BoolField({
    name: "notify_on_sale",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "notify_on_stock",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
  }));

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_user_wishlists_user_product ON user_wishlists (user, product)",
    "CREATE INDEX idx_user_wishlists_user_active ON user_wishlists (user, active)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_wishlists");
  app.delete(collection);
});
