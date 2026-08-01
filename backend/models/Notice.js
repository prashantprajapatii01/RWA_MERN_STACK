const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: String,
  date: String,
  expiryDate: String,
  priority: {
    type: String,
    default: "Low"
  },
  attachment: String,
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Notice", noticeSchema);