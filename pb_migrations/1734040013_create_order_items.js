/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const orders = app.findCollectionByNameOrId("orders");
  const products = app.findCollectionByNameOrId("products");

  const collection = new Collection({
    name: "order_items",
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

  collection.fields.add(new RelationField({
    name: "product",
    required: true,
    presentable: false,
    collectionId: products.id,
    cascadeDelete: false,
    maxSelect: 1,
    displayFields: ["name"]
  }));

  collection.fields.add(new TextField({
    name: "product_name",
    required: true,
    presentable: true,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "product_sku",
    required: false,
    presentable: false,
    max: 50
  }));

  collection.fields.add(new URLField({
    name: "product_image_url",
    required: false,
    presentable: false
  }));

  collection.fields.add(new NumberField({
    name: "unit_price",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "quantity",
    required: true,
    presentable: false,
    min: 1,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "discount_amount",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "tax_amount",
    required: false,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "line_total",
    required: true,
    presentable: false,
    min: 0,
    noDecimal: false
  }));

  collection.indexes = [
    "CREATE INDEX idx_order_items_order ON order_items (order)",
    "CREATE INDEX idx_order_items_product ON order_items (product)",
    "CREATE INDEX idx_order_items_order_product ON order_items (order, product)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("order_items");
  app.delete(collection);
});
