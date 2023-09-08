migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("25k410b55nvjsy9");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "25k410b55nvjsy9",
    "created": "2023-07-24 12:37:52.540Z",
    "updated": "2023-07-24 12:37:52.540Z",
    "name": "time",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dwmfg9c9",
        "name": "field",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3kaaicsb",
        "name": "field1",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
