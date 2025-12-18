/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const collection = new Collection({
    name: "settings",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new TextField({
    name: "key",
    required: true,
    presentable: true,
    max: 100,
    pattern: "^[a-z0-9_]+$"
  }));

  collection.fields.add(new JSONField({
    name: "value",
    required: true,
    presentable: false,
    maxSize: 2000000
  }));

  collection.fields.add(new TextField({
    name: "description",
    required: false,
    presentable: false,
    max: 500
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
  }));

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_settings_key ON settings (key)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("settings");
  app.delete(collection);
});
