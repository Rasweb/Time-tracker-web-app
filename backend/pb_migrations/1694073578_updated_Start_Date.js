migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  collection.listRule = null

  return dao.saveCollection(collection)
})
