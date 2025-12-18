/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const domDiscountCodes = app.findCollectionByNameOrId("dom_discount_codes");
  const domPaymentMethods = app.findCollectionByNameOrId("dom_payment_methods");
  const userPaymentMethod = app.findCollectionByNameOrId("user_payment_methods");
  const userAddresses = app.findCollectionByNameOrId("user_addresses");

  const collection = new Collection({
    name: "orders",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new TextField({
    name: "order_number",
    required: true,
    presentable: true,
    max: 20
  }));

  collection.fields.add(new RelationField({
    name: "user",
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: true,
    maxSelect: 1
  }));

  collection.fields.add(new NumberField({
    name: "subtotal",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "discount_amount",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new RelationField({
    name: "discount_code",
    required: false,
    presentable: false,
    collectionId: domDiscountCodes.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["code"]
  }));

  collection.fields.add(new NumberField({
    name: "tax",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "shipping",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "total",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new SelectField({
    name: "status",
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
    name: "payment_method",
    required: true,
    presentable: false,
    collectionId: domPaymentMethods.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new RelationField({
    name: "user_payment_method",
    required: false,
    presentable: false,
    collectionId: userPaymentMethod.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["nickname"]
  }));

  collection.fields.add(new TextField({
    name: "paypal_order_id",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "paypal_payer_id",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new SelectField({
    name: "payment_status",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "pending",
      "paid",
      "completed",
      "failed",
      "refunded"
    ]
  }));

  collection.fields.add(new RelationField({
    name: "shipping_address",
    required: true,
    presentable: false,
    collectionId: userAddresses.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new RelationField({
    name: "billing_address",
    required: false,
    presentable: false,
    collectionId: userAddresses.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new TextField({
    name: "tracking_number",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "customer_notes",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new TextField({
    name: "admin_notes",
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
    "CREATE UNIQUE INDEX idx_orders_order_number ON orders (order_number)",
    "CREATE INDEX idx_orders_user_status ON orders (user, status)",
    "CREATE INDEX idx_orders_payment_status ON orders (payment_status)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("orders");
  app.delete(collection);
});
