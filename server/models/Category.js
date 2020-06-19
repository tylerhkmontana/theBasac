const mongoose = require("mongoose")

const Category = mongoose.model("Category", new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    uppercase: true
  },
  items: {
    type: Array
  }
}, { timestamps: true }))

module.exports = Category