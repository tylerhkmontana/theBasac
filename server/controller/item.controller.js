const express = require("express")
const router = express.Router()
const Item = require("../models/Item")
const Category = require("../models/Category")

router.post("/add", async (req, res) => {
  const { name, price, category, description } = req.body

  try {
    const existingCategory = await Category.findOne({ categoryName: category })
    const existingItem = await Item.findOne({ name })

    if(!!existingCategory && !(!!existingItem)) { //Category exists && Item doesn't exist
      const newItem = await new Item({
        name,
        price,
        category,
        description
      }).save()
      await Category.updateOne({ categoryName: category }, { $push: { items: newItem } })
      res.status(200).send("Successfully created/added the item")
    } else {
      !!existingItem ? res.status(400).send("The item already exists") : res.status(400).send("The category does not exists")
    }
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
})

router.delete("/delete", async (req, res) => {
  const itemId = req.body.itemId

  try {
    deletedItem = await Item.findOneAndDelete({ _id: itemId })
    if(!!deletedItem) {
      const result = await Category.updateOne({ categoryName: deletedItem.category }, { $pull: { items: { name: deletedItem.name } } })
      console.log(result)
      !!result ? res.status(200).send("Successfully removed the item") : res.status(400).send("Failed to remove the item from the category")
    } else {
      res.status(400).send("The item does not exist")
    }
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
})

module.exports = router