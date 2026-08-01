const Newsletter = require("../models/Newsletter")

// CREATE (Subscribe)
exports.createNewsletter = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase()

    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    // duplicate check
    const exists = await Newsletter.findOne({ email })

    if (exists) {
      return res.status(400).json({ message: "Email already subscribed" })
    }

    const item = await Newsletter.create({
      email,
      status: true
    })

    res.status(201).json(item)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getNewsletter = async (req, res) => {
  try {
    const data = await Newsletter.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE
exports.getSingleNewsletter = async (req, res) => {
  try {
    const item = await Newsletter.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Not found" })
    }

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE (Toggle Status)
exports.updateNewsletter = async (req, res) => {
  try {
    const updated = await Newsletter.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status
      },
      { new: true }
    )

    res.json(updated)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
exports.deleteNewsletter = async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}