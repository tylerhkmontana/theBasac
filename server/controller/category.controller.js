const express = require("express")
const router = express.Router()
const { ensureAuthorized } = require("../configs/jwt.config")
const Category = require("../models/Category")
const Item = require("../models/Item")

router.get("/", async (req, res) => {
  try {
    const briefMenu = await Category.find({}).select('_id categoryName items.eName items.kName items.price')
    res.status(200).json(briefMenu)
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.get("/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId

  try {
    const items = await Category.findById(categoryId)
    if(!!items) {
      res.status(200).json(items)
    } else {
      res.status(400).send("No such category")
    }
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/add", ensureAuthorized, async (req, res) => {
  const { categoryName } = req.body
  try {
    const reqCat = await Category.findOne({ categoryName: categoryName })
    if(!!reqCat) {
      res.status(400).send("The category already exists")
    } else {
      const newCategory = new Category({
        categoryName
      })
      await newCategory.save()

      res.status(200).send("Successfully created a category")
    }
  } catch (err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
}) 

router.put("/update", async (req, res) => {
  const oldCategoryName = req.body.oldCategoryName
  const newCategoryName = req.body.newCategoryName

  try {
    const reqCat = await Category.findOne({ categoryName: newCategoryName })
    if(!!reqCat) {
      res.status(400).send("The category already exists")
    } else {
      const response = await Category.findOneAndUpdate({ categoryName: oldCategoryName }, { categoryName: newCategoryName })
      if(!!response) {
        res.status(200).send("Successfully updated the category")
      } else {
        res.status(400).send("No such category")
      }
    }
  } catch(err) {
      console.log(err)
      res.status(500).send("Internal Server Error")
  }
})

router.delete("/delete", ensureAuthorized, async (req, res) => {
    const categoryName = req.body.categoryName

    try {
      const response = await Category.findOneAndDelete({ categoryName })
      if(!!response) {
        await Item.deleteMany({ category: categoryName })
        res.status(200).send("Successfully deleted the category")
      } else {
        res.status(400).send("No such category")
      }
    } catch(err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})
  
module.exports = router