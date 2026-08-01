const Feature = require("../models/Feature")

// CREATE
exports.createFeature = async (req, res) => {
  try {

    const payload = {
      name: req.body.name?.trim(),
      icon: req.body.icon,
      shortDescription: req.body.shortDescription?.trim(),
      status: req.body.status
    }

    // duplicate check
    const exists = await Feature.findOne({
      name: payload.name
    })

    if (exists) {
      return res.status(400).json({ message: "Feature already exists" })
    }

    const feature = await Feature.create(payload)

    res.status(201).json(feature)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getFeature = async (req, res) => {
  try {

    const data = await Feature.find().sort({ createdAt: -1 })

    res.json(data)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE
exports.getSingleFeature = async (req, res) => {
  try {

    const item = await Feature.findById(req.params.id)

    if (!item)
      return res.status(404).json({ message: "Feature not found" })

    res.json(item)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateFeature = async (req, res) => {
  try {

    const payload = {
      name: req.body.name?.trim(),
      icon: req.body.icon,
      shortDescription: req.body.shortDescription?.trim(),
      status: req.body.status
    }

    // duplicate check (exclude current)
    const exists = await Feature.findOne({
      name: payload.name,
      _id: { $ne: req.params.id }
    })

    if (exists) {
      return res.status(400).json({ message: "Feature already exists" })
    }

    const updated = await Feature.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    )

    res.json(updated)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
exports.deleteFeature = async (req, res) => {
  try {

    await Feature.findByIdAndDelete(req.params.id)

    res.json({ message: "Feature deleted successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}