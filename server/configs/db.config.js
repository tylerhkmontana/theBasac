const mongoose = require("mongoose")
const uri = "mongodb://127.0.0.1:27017/theBasac?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const dbConnection = async () => {
  try {
    await mongoose.connect(uri, 
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })

      console.log("Database connected...")
  } catch(err) {
    console.log(err)
    throw err
  }
}

module.exports = dbConnection