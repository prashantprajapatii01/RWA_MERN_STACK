const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({

  // 🔥 USER LINK (IMPORTANT)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true   // 🚀 faster queries
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },

  flatNo: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    default: ""
  },

  contact: {
    type: String,
    default: ""
  },

  // 🔥 ADMIN CONTROL FIELD
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },

  paymentAmount: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

module.exports = mongoose.model("Complaint", complaintSchema)