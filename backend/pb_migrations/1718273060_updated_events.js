/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b6wwbzxi",
    "name": "latitude",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7j5a0qxg",
    "name": "longitude",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // remove
  collection.schema.removeField("b6wwbzxi")

  // remove
  collection.schema.removeField("7j5a0qxg")

  return dao.saveCollection(collection)
})
