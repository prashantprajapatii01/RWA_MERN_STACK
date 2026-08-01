const mongoose = require("mongoose")

const residentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  flatNo: {
    type: String,
    required: true,
    trim: true
  },

  block: {
    type: String,
    trim: true
  },

  members: {
    type: Number,
    default: 1,
    min: 1
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }

}, { timestamps: true })

// Optional: prevent duplicate flatNo at DB level (recommended)
// residentSchema.index({ flatNo: 1 }, { unique: true })

module.exports = mongoose.model("Resident", residentSchema)