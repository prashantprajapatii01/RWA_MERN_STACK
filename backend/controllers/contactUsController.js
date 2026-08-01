const ContactUs = require("../models/ContactUs")

// CREATE
exports.createContactUs = async (req, res) => {
  try {
    const data = await ContactUs.create(req.body)
    res.status(201).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
}

// GET ALL
exports.getContactUs = async (req, res) => {
  try {
    const data = await ContactUs.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}

// GET SINGLE
exports.getSingleContactUs = async (req, res) => {
  try {
    const item = await ContactUs.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Not found" })
    }

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}

// UPDATE
exports.updateContactUs = async (req, res) => {
  try {
    const updated = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}

// DELETE
exports.deleteContactUs = async (req, res) => {
  try {
    await ContactUs.findByIdAndDelete(req.params.id)

    res.json({ message: "Deleted Successfully" })
  } catch (err) {
    res.status(500).json({ message: "Server Error" })
  }
}