/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "user_notifications",
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

  collection.fields.add(new SelectField({
    name: "type",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "order_status",
      "product_stock",
      "product_sale",
      "system",
      "security"
    ]
  }));

  collection.fields.add(new TextField({
    name: "title",
    required: true,
    presentable: true,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "message",
    required: true,
    presentable: false,
    max: 1000
  }));

  collection.fields.add(new TextField({
    name: "reference_type",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "reference_id",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "action_url",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new TextField({
    name: "action_label",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new BoolField({
    name: "read",
    required: false,
    presentable: false
  }));

  collection.fields.add(new DateField({
    name: "read_at",
    required: false,
    presentable: false
  }));

  collection.fields.add(new JSONField({
    name: "sent_via",
    required: false,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new DateField({
    name: "sent_at",
    required: false,
    presentable: false
  }));

  // Audit fields
  collection.fields.add(new AutodateField({
    name: "created_at",
    onCreate: true,
    onUpdate: false
  }));

  collection.indexes = [
    "CREATE INDEX idx_user_notifications_user_read ON user_notifications (user, read)",
    "CREATE INDEX idx_user_notifications_user_type ON user_notifications (user, type)",
    "CREATE INDEX idx_user_notifications_created ON user_notifications (created_at)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_notifications");
  app.delete(collection);
});
