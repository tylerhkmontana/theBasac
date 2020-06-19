const mongoose = require("mongoose")

const Item = mongoose.model("Item", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    required: true,
    uppercase: true
  },
  itemIamge: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true }))

module.exports = Item