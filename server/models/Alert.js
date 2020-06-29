const mongoose = require("mongoose")

const Alert = mongoose.model("Alert", new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true }))

module.exports = Alert