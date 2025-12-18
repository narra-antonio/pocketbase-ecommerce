/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");

  const collection = new Collection({
    name: "user_addresses",
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
    required: true,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: true,
    maxSelect: 1
  }));

  collection.fields.add(new SelectField({
    name: "address_type",
    required: true,
    presentable: false,
    maxSelect: 1,
    values: [
      "shipping",
      "billing",
      "both"
    ]
  }));

  collection.fields.add(new TextField({
    name: "first_name",
    required: true,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "last_name",
    required: true,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "company",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "street_address",
    required: true,
    presentable: false,
    max: 200
  }));

  collection.fields.add(new TextField({
    name: "apartment",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "city",
    required: true,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "state",
    required: false,
    presentable: false,
    max: 100
  }));

  collection.fields.add(new TextField({
    name: "postal_code",
    required: true,
    presentable: false,
    max: 20
  }));

  collection.fields.add(new TextField({
    name: "country",
    required: true,
    presentable: false,
    min: 2,
    max: 2,
    pattern: "^[A-Z]{2}$"
  }));

  collection.fields.add(new TextField({
    name: "phone",
    required: false,
    presentable: false,
    max: 20
  }));

  collection.fields.add(new BoolField({
    name: "is_default",
    required: false,
    presentable: false
  }));

  collection.fields.add(new BoolField({
    name: "active",
    required: false,
    presentable: false
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
    name: "created_at",
    onCreate: true,
    onUpdate: false
  }));

  collection.fields.add(new RelationField({
    name: "updated_by",
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

  collection.indexes = [
    "CREATE INDEX idx_user_addresses_user_default ON user_addresses (user, is_default)",
    "CREATE INDEX idx_user_addresses_user_active ON user_addresses (user, active)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("user_addresses");
  app.delete(collection);
});
