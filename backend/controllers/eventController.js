const Event = require("../models/Event")

// CREATE
exports.createEvent = async (req, res) => {
  try {

    const payload = {
      ...req.body,
      name: req.body.name?.trim(),
      location: req.body.location?.trim(),
      category: req.body.category?.trim(),
      joinmember: req.body.joinmember?.trim()
    }

    // duplicate check
    const exists = await Event.findOne({
      name: payload.name
    })

    if (exists) {
      return res.status(400).json({ message: "Event already exists" })
    }

    const event = await Event.create(payload)

    res.status(201).json(event)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getEvents = async (req, res) => {
  try {

    const data = await Event.find().sort({ createdAt: -1 })

    res.json(data)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET SINGLE
exports.getSingleEvent = async (req, res) => {
  try {

    const item = await Event.findById(req.params.id)

    if (!item)
      return res.status(404).json({ message: "Event not found" })

    res.json(item)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateEvent = async (req, res) => {
  try {

    const payload = {
      ...req.body,
      name: req.body.name?.trim(),
      location: req.body.location?.trim(),
      category: req.body.category?.trim(),
      joinmember: req.body.joinmember?.trim()
    }

    // duplicate check (exclude current)
    const exists = await Event.findOne({
      name: payload.name,
      _id: { $ne: req.params.id }
    })

    if (exists) {
      return res.status(400).json({ message: "Event already exists" })
    }

    const updated = await Event.findByIdAndUpdate(
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
exports.deleteEvent = async (req, res) => {
  try {

    await Event.findByIdAndDelete(req.params.id)

    res.json({ message: "Event deleted successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}