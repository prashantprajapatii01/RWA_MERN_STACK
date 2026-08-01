const Testimonial = require("../models/Testimonial")

// CREATE
exports.createTestimonial = async (req, res) => {
  try {
    const data = await Testimonial.create(req.body)
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET ALL
exports.getTestimonials = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE
exports.updateTestimonial = async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: "Not found" })
    }

    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE
exports.deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: "Not found" })
    }

    res.json({ message: "Deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}