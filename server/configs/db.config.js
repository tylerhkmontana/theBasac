const mongoose = require("mongoose")
const uri = process.env.DATABASE_URI

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