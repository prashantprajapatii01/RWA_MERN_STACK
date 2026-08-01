const Resident = require("../models/Resident")

// CREATE
exports.createResident = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      name: req.body.name?.trim(),
      email: req.body.email?.trim().toLowerCase(),
      flatNo: req.body.flatNo?.trim(),
      block: req.body.block?.trim()
    }

    // optional duplicate check (flatNo)
    const exists = await Resident.findOne({ flatNo: payload.flatNo })
    if (exists) {
      return res.status(400).json({ message: "Flat already assigned" })
    }

    const resident = await Resident.create(payload)
    res.status(201).json(resident)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getResident = async (req, res) => {
  try {
    const data = await Resident.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE
exports.getSingleResident = async (req, res) => {
  try {
    const item = await Resident.findById(req.params.id)
    if (!item) return res.status(404).json({ message: "Not found" })

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateResident = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      name: req.body.name?.trim(),
      email: req.body.email?.trim().toLowerCase(),
      flatNo: req.body.flatNo?.trim(),
      block: req.body.block?.trim()
    }

    // optional duplicate check (exclude current)
    const exists = await Resident.findOne({
      flatNo: payload.flatNo,
      _id: { $ne: req.params.id }
    })
    if (exists) {
      return res.status(400).json({ message: "Flat already assigned" })
    }

    const updated = await Resident.findByIdAndUpdate(
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
exports.deleteResident = async (req, res) => {
  try {
    await Resident.findByIdAndDelete(req.params.id)
    res.json({ message: "Resident deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}