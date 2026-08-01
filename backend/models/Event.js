const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    required: true,
    trim: true
  },

  joinmember: {
    type: String,
    required: true,
    trim: true
  },

  pic: {
    type: String
  },

  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true })

module.exports = mongoose.model("Event", eventSchema)