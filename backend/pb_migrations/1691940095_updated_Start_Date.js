migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j3fbypvc",
    "name": "connected_user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnkdcabi",
    "name": "date",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  // remove
  collection.schema.removeField("j3fbypvc")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wnkdcabi",
    "name": "field",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
