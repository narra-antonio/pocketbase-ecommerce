/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  // 1. Create and save empty collection
  const collection = new Collection({
    name: "dom_roles",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);  // ← SAVE SUBITO!

  // 2. Add fields one by one
  collection.fields.add(new TextField({
    name: "name",
    required: true,
    presentable: false,
    max: 50
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

  collection.fields.add(new JSONField({
    name: "permissions",
    required: true,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new NumberField({
    name: "sort_order",
    required: false,
    presentable: false,
    noDecimal: true
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
  }));

  // 3. Add indexes
  collection.indexes = [
    "CREATE UNIQUE INDEX idx_dom_roles_slug ON dom_roles (slug)"
  ];

  // 4. Save again with fields and indexes
  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("dom_roles");
  app.delete(collection);
});
