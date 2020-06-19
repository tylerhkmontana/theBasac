const mongoose = require("mongoose")

const Admin = mongoose.model("Admin", new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adminId: {
    type: String,
    required: true,
    uppercase: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }))

module.exports = Admin