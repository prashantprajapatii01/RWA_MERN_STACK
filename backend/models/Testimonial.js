const mongoose = require("mongoose")

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  star: { type: Number, required: true },
  pname: { type: String },
  product: { type: String },

  status: { type: Boolean, default: true }

}, { timestamps: true })

module.exports = mongoose.model("Testimonial", testimonialSchema)