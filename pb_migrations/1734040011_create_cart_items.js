/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const products = app.findCollectionByNameOrId("products");

  const collection = new Collection({
    name: "cart_items",
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
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: true,
    maxSelect: 1
  }));

  collection.fields.add(new RelationField({
    name: "product",
    required: true,
    presentable: false,
    collectionId: products.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new NumberField({
    name: "quantity",
    required: true,
    presentable: false,
    min: 1,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "price_snapshot",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_cart_items_user_product ON cart_items (user, product)",
    "CREATE INDEX idx_cart_items_user ON cart_items (user)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("cart_items");
  app.delete(collection);
});
