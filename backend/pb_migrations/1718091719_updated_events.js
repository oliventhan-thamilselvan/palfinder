/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // remove
  collection.schema.removeField("iyjsjp83")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buinpvxd",
    "name": "administrateur",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iyjsjp83",
    "name": "administrateur",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("buinpvxd")

  return dao.saveCollection(collection)
})
