const express = require("express")
const router = express.Router()
const Slide = require("../models/Slide.js")

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const { ensureAuthorized } = require("../configs/jwt.config")

router.get("/", async (req, res) => {
  try {
    const slides = await Slide.find({})
    res.status(200).json(slides)
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/add", ensureAuthorized, upload.single('file'), async (req, res) => {

  const newFile = {
    fileName: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype
  }

  try {
    const targetFile = await Slide.findOne({ 'file.fileName': newFile.fileName })
    console.log(targetFile)
    if(!!targetFile) {
      res.status(400).send("A file with the same name already exists")
    } else {
      await Slide({ file: newFile }).save()
      res.status(200).send("Successfully added the slide")
    }
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.delete("/delete", ensureAuthorized, async (req, res) => {
  const { fileName } = req.body

  try {
    const deletedSlide = await Slide.findOneAndDelete({ 'file.fileName': fileName })
    !!deletedSlide ? res.status(200).send("Successfully deleted the slide") : res.status(400).send("Could not find the slide")
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router