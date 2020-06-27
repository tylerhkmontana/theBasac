const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const saltRounds = 10
const Admin = require("../models/Admin")
const jwtModules = require("../configs/jwt.config")

router.post("/register", async (req, res) => {
  var { adminId, password, name } = req.body

  try { 
    const existingUser = await Admin.findOne({ adminId })

    if(!!existingUser) {
      res.status(400).send("User already Exists")
    } else {
      const salt = await bcrypt.genSalt(saltRounds)
      password = await bcrypt.hash(password, salt)

      const newAdmin = await new Admin({
        name,
        adminId,
        password
      }).save()

      res.status(200).json(newAdmin)
    }
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})

router.post("/login", async (req, res) => {
  const { adminId, password } = req.body
  
  try {
    const targetAdmin = await Admin.findOne({ adminId })

    if(!!targetAdmin) {
      if(await bcrypt.compare(password, targetAdmin.password)) {
        const loggedInAdmin = {
          name: targetAdmin.name,
          adminId: targetAdmin.adminId
        }

        const token = jwtModules.signAdmin(loggedInAdmin)
        res.status(200).json({
          admin: loggedInAdmin,
          token
        })
      } else {
        res.status(403).send("Incorrect Passowrd")
      }
    } else {
      res.status(403).send("Admin not found")
    }
  } catch(err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
  }
})
module.exports = router