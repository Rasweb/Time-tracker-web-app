migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("iu8fwfmmaqwob7n")

  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
