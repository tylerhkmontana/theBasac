const express = require("express")
const router = express.Router()
const { ensureAuthorized } = require("../configs/jwt.config")
const Alert = require("../models/Alert")

router.get("/", async (req, res) => {
  try {
    const alert = await Alert.find({})
    res.status(200).json(alert)
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/add", ensureAuthorized, async (req, res) => {
  const { title, message } = req.body
  try {
    await Alert.deleteMany()
    await Alert({ title, message }).save()
    res.status(200).send("Successfully saved new alert")
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.delete("/delete", ensureAuthorized, async (req, res) => {
  try {
    await Alert.deleteMany()
    res.status(200).send("Successfully dropped alert")
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router