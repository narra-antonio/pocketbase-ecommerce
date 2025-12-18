/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const users = app.findCollectionByNameOrId("_pb_users_auth_");
  const reviews = app.findCollectionByNameOrId("product_reviews");

  const collection = new Collection({
    name: "review_helpfulness",
    type: "base",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null
  });

  app.save(collection);

  collection.fields.add(new RelationField({
    name: "review",
    required: true,
    presentable: false,
    collectionId: reviews.id,
    cascadeDelete: true,
    maxSelect: 1
  }));

  collection.fields.add(new RelationField({
    name: "user",
    required: false,
    presentable: false,
    collectionId: users.id,
    cascadeDelete: false,
    maxSelect: 1
  }));

  collection.fields.add(new BoolField({
    name: "is_helpful",
    required: true,
    presentable: false
  }));

  collection.indexes = [
    "CREATE UNIQUE INDEX idx_review_helpfulness_review_user ON review_helpfulness (review, user)",
    "CREATE INDEX idx_review_helpfulness_review ON review_helpfulness (review)"
  ];

  app.save(collection);

}, (app) => {
  const collection = app.findCollectionByNameOrId("review_helpfulness");
  app.delete(collection);
});
