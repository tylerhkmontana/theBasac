require("dotenv").config();
const express = require("express")
const cors = require("cors")
const dbConnection = require("./configs/db.config")
const app = express()

// Connect to database
dbConnection()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



app.use("/api/admin", require('./controller/admin.controller.js'))
app.use("/api/category", require('./controller/category.controller.js'))
app.use("/api/item", require('./controller/item.controller.js'))
app.use("/api/slide", require('./controller/slide.controller.js'))
app.use("/api/alert", require('./controller/alert.controller.js'))

// Handle production
if(process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + '/public/'))

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on ${port}...`))
