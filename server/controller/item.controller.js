const express = require("express")
const router = express.Router()

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const Item = require("../models/Item")
const Category = require("../models/Category")
const { ensureAuthorized } = require("../configs/jwt.config")


router.post("/add", ensureAuthorized, upload.single('file'), async (req, res) => {
  let { name, price, category, description } = req.body
  const file = req.file

  if(!!file) {
    itemImage  = { data: file.buffer, contentType: file.mimetype }
  } else {
    itemImage = null
  }

  try {
    const existingCategory = await Category.findById(category)
    const existingItem = await Item.findOne({ name })

    if(!!existingCategory && !(!!existingItem)) { //Category exists && Item doesn't exist
      let category = existingCategory.categoryName
      const newItem = await new Item({
        name,
        price,
        category,
        description,
        itemImage
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

router.delete("/delete", ensureAuthorized ,async (req, res) => {
  const { items, categoryId } = req.body

  console.log(items)
  try {
    await Item.deleteMany({ name: { $in: items } })

    const result = await Category.updateOne({ _id: categoryId }, { $pull: { items: { name: { $in: items } } } })

    !!result ? res.status(200).send("Successfully removed the item") : res.status(400).send("Failed to remove the item from the category")
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
})

module.exports = router