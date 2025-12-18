/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = new Collection({
    name: "dom_discount_codes",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new TextField({
    name: "code",
    required: true,
    presentable: true,
    max: 50,
    pattern: "^[A-Z0-9]+$"
  }));

  collection.fields.add(new TextField({
    name: "description",
    required: false,
    max: 500
  }));

  collection.fields.add(new SelectField({
    name: "discount_type",
    required: true,
    maxSelect: 1,
    values: [
      "percentage",
      "fixed_amount",
      "free_shipping"
    ]
  }));

  collection.fields.add(new NumberField({
    name: "discount_value",
    required: true,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "min_order_amount",
    required: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "max_discount_amount",
    required: false,
    min: 0,
    noDecimal: false
  }));

  collection.fields.add(new NumberField({
    name: "usage_limit",
    required: false,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "usage_count",
    required: false,
    min: 0,
    noDecimal: true
  }));

  collection.fields.add(new NumberField({
    name: "usage_per_user",
    required: false,
    min: 1,
    noDecimal: true
  }));

  collection.fields.add(new DateField({
    name: "valid_from",
    required: true
  }));

  collection.fields.add(new DateField({
    name: "valid_until",
    required: false
  }));

  collection.fields.add(new JSONField({
    name: "applicable_categories",
    required: false,
    maxSize: 2000000
  }));

  collection.fields.add(new JSONField({
    name: "applicable_products",
    required: false,
    maxSize: 2000000
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false
  }));

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_dom_discount_codes_code ON dom_discount_codes (code)",
    "CREATE INDEX idx_dom_discount_codes_dates ON dom_discount_codes (valid_from, valid_until, active)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("dom_discount_codes");
  app.delete(collection);
});
