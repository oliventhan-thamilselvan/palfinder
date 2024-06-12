/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("w70a4kzg5kcoa3u");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "w70a4kzg5kcoa3u",
    "created": "2024-06-12 22:18:05.428Z",
    "updated": "2024-06-12 22:18:05.428Z",
    "name": "sports",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u5p7lyxe",
        "name": "Football",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "idtmuqkx",
        "name": "Basket",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
