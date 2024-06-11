/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9pmywdq3vmmcos")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m7qmuamr",
    "name": "nmb_participants",
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
  collection.schema.removeField("m7qmuamr")

  return dao.saveCollection(collection)
})
