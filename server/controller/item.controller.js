const express = require("express")
const router = express.Router()

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const Item = require("../models/Item")
const Category = require("../models/Category")
const { ensureAuthorized } = require("../configs/jwt.config")
const { update } = require("../models/Category")


router.post("/add", ensureAuthorized, upload.single('file'), async (req, res) => {
  let { kName, eName, price, category, description } = req.body
  const file = req.file

  if(!!file) {
    itemImage  = { data: file.buffer, contentType: file.mimetype }
  } else {
    itemImage = null
  }

  try {
    const existingCategory = await Category.findById(category)
    const existingItem = await Item.findOne({ eName })

    if(!!existingCategory && !(!!existingItem)) { //Category exists && Item doesn't exist
      let category = existingCategory.categoryName
      const newItem = await new Item({
        eName,
        kName,
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

router.put("/update", ensureAuthorized, upload.single('file'), async (req, res) => {
  const { price, _id } = req.body

  try {
    req.file ? 
      await Item.updateOne({ _id }, { itemImage: { data: req.file.buffer, contentType: req.file.mimetype }, price }) :
      await Item.updateOne({ _id }, { price })

      const updatedItem = await Item.findById(_id)

    await Category.updateOne({ categoryName: updatedItem.category }, { $pull: { items: { eName: updatedItem.eName } } })
    await Category.updateOne({ categoryName: updatedItem.category }, { $push: { items: updatedItem } })

    res.status(200).json((await Category.findOne({ categoryName: updatedItem.category })).items)
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal server error")
  }
})

router.put("/update/order", ensureAuthorized, async (req, res) => {
  const { itemOrder, categoryId } = req.body  
  const newOrder = []
  for(let i = 0; i < itemOrder.length; i++) {
    try {
      newOrder.push(await Item.findOne({ eName: itemOrder[i] }))
    } catch(err) {
      console.log(err)
      res.status(400).send("Failed to load items")
    }
  }
  try {
    await Category.updateOne({ _id: categoryId }, {$set: { items: newOrder }})
    res.status(200).json((await Category.findById(categoryId)).items)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.delete("/delete", ensureAuthorized ,async (req, res) => {
  const { items, categoryId } = req.body

  try {
    await Item.deleteMany({ eName: { $in: items } })

    const result = await Category.updateOne({ _id: categoryId }, { $pull: { items: { eName: { $in: items } } } })

    !!result ? res.status(200).send("Successfully removed the item") : res.status(400).send("Failed to remove the item from the category")
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
})

module.exports = router