const mongoose = require("mongoose")

const Item = mongoose.model("Item", new mongoose.Schema({
  kName: {
    type: String,
    required: true,
  },
  eName: {
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
  itemImage: {
    data: Buffer,
    contentType: String
  }
}, { timestamps: true }))

module.exports = Item