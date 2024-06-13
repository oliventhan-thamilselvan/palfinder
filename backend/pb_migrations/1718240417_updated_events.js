/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gufywlmb",
    "name": "current_participants",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gufywlmb",
    "name": "current_participants",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
