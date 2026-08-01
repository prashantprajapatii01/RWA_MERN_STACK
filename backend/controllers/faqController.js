const Faq = require("../models/Faq")

// CREATE
exports.createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body)
    res.status(201).json(faq)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getFaq = async (req, res) => {
  try {
    const data = await Faq.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE
exports.getSingleFaq = async (req, res) => {
  try {
    const item = await Faq.findById(req.params.id)
    if (!item) return res.status(404).json({ message: "Not found" })

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateFaq = async (req, res) => {
  try {
    const updated = await Faq.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
exports.deleteFaq = async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}