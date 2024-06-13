/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gtqer6xw",
    "name": "events",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h9pmywdq3vmmcos",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("gtqer6xw")

  return dao.saveCollection(collection)
})
