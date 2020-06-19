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


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on ${port}...`))
