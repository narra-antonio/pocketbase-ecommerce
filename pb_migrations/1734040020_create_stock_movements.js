/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const products = app.findCollectionByNameOrId("products");
  const orders = app.findCollectionByNameOrId("orders");

  const collection = new Collection({
    name: "stock_movements",
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
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new SelectField({
    name: "movement_type",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "purchase",
      "sale",
      "adjustment",
      "return",
      "damaged",
      "restock"
    ]
  }));

  collection.fields.add(new NumberField({
    name: "quantity",
    required: true,
    presentable: false,
    noDecimal: true
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
    name: "stock_before",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "stock_after",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new TextField({
    name: "notes",
    required: false,
    presentable: false,
    max: 1000
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
    "CREATE INDEX idx_stock_movements_product_created ON stock_movements (product, created_at)",
    "CREATE INDEX idx_stock_movements_movement_type ON stock_movements (movement_type)",
    "CREATE INDEX idx_stock_movements_order ON stock_movements (order)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("stock_movements");
  app.delete(collection);
});
