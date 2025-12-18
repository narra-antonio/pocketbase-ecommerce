/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const domPaymentMethods = app.findCollectionByNameOrId("dom_payment_methods");

  const collection = new Collection({
    name: "user_payment_methods",
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
    name: "payment_method",
    required: true,
    presentable: false,
    collectionId: domPaymentMethods.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new JSONField({
    name: "payment_data",
    required: false,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new TextField({
    name: "nickname",
    required: false,
    presentable: true,
    max: 100
  }));

  collection.fields.add(new BoolField({
    name: "is_default",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
  }));

  collection.indexes = [
    "CREATE INDEX idx_user_payment_methods_user_default ON user_payment_methods (user, is_default)",
    "CREATE INDEX idx_user_payment_methods_user_method ON user_payment_methods (user, payment_method)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_payment_methods");
  app.delete(collection);
});
