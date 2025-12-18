/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "user_login_history",
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

  collection.fields.add(new BoolField({
    name: "login_successful",
    required: true,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "ip_address",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "user_agent",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new TextField({
    name: "location",
    required: false,
    presentable: false,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "failure_reason",
    required: false,
    presentable: false,
    max: 200
  }));

  collection.fields.add(new BoolField({
    name: "twofa_used",
    required: false,
    presentable: false
  }));

  collection.fields.add(new TextField({
    name: "twofa_method_used",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new AutodateField({
    name: "created_at",
    onCreate: true,
    onUpdate: false
  }));


  collection.indexes = [
    "CREATE INDEX idx_user_login_history_user ON user_login_history (user)",
    "CREATE INDEX idx_user_login_history_user_created ON user_login_history (user, created_at)",
    "CREATE INDEX idx_user_login_history_successful ON user_login_history (login_successful)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_login_history");
  app.delete(collection);
});
