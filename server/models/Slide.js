const mongoose = require("mongoose")

const Slide = mongoose.model("Slide", new mongoose.Schema({
  file: {
    fileName: String,
    data: Buffer,
    contentType: String,
  }
}, { timestamps: true }))

module.exports = Slide