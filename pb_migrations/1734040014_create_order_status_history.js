/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const orders = app.findCollectionByNameOrId("orders");
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "order_status_history",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new RelationField({
    name: "order",
    required: true,
    presentable: false,
    collectionId: orders.id,
    cascadeDelete: true,
    maxSelect: 1,
    displayFields: ["order_number"]
  }));

  collection.fields.add(new SelectField({
    name: "from_status",
    required: false,
    presentable: false,
    maxSelect: 1,
    values: [
      "pending",
      "processing",
      "paid",
      "shipped",
      "delivered",
      "cancelled"
    ]
  }));

  collection.fields.add(new SelectField({
    name: "to_status",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "pending",
      "processing",
      "paid",
      "shipped",
      "delivered",
      "cancelled"
    ]
  }));

  collection.fields.add(new RelationField({
    name: "changed_by",
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new TextField({
    name: "changed_by_role",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new TextField({
    name: "notes",
    required: false,
    presentable: false,
    max: 1000
  }));

  collection.fields.add(new TextField({
    name: "ip_address",
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
    "CREATE INDEX idx_order_status_history_order ON order_status_history (order)",
    "CREATE INDEX idx_order_status_history_order_created ON order_status_history (order, created_at)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("order_status_history");
  app.delete(collection);
});
