const mongoose = require("mongoose")

const newsletterSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  status: {
    type: Boolean,
    default: true   // Active by default
  }

}, { timestamps: true })

module.exports = mongoose.model("Newsletter", newsletterSchema)