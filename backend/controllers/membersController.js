const Member = require("../models/Member")

// CREATE
exports.createMember = async (req, res) => {
  try {
    const { username, email } = req.body

    // Duplicate check
    const exists = await Member.findOne({
      $or: [{ username }, { email }]
    })
    if (exists) {
      return res.status(400).json({ message: "Username or Email already exists" })
    }

    const member = await Member.create(req.body)
    res.json(member)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// GET ALL
exports.getMembers = async (req, res) => {
  try {
    const data = await Member.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// UPDATE
exports.updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: "Member not found" })
    }

    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// DELETE
exports.deleteMember = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id)

    if (!deleted) {
      return res.status(404).json({ message: "Member not found" })
    }

    res.json({ message: "Member deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}