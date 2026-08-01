const mongoose = require("mongoose")

const featureSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  icon: {
    type: String,
    required: true
  },

  shortDescription: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

module.exports = mongoose.model("Feature", featureSchema)