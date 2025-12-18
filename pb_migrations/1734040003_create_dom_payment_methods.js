/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = new Collection({
    name: "dom_payment_methods",
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
    max: 50,
    pattern: "^[a-z0-9_]+$"
  }));

  collection.fields.add(new TextField({
    name: "description",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new TextField({
    name: "icon",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "config_key",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new BoolField({
    name: "requires_user_data",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "is_sandbox",
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

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_dom_payment_methods_slug ON dom_payment_methods (slug)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("dom_payment_methods");
  app.delete(collection);
});
