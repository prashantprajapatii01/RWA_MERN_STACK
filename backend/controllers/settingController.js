const Setting = require("../models/Setting")

// ================= CREATE =================
exports.createSetting = async (req, res) => {
  try {

    // 🔥 only one setting allowed
    const existing = await Setting.findOne()

    if (existing) {
      return res.status(400).json({ message: "Setting already exists" })
    }

    const data = await Setting.create(req.body)

    res.status(201).json(data)

  } catch (err) {
    console.log(err)
    res.status(500).json({})
  }
}


// ================= GET =================
exports.getSetting = async (req, res) => {
  try {

    const data = await Setting.find()

    res.json(data || [])

  } catch (err) {
    res.status(500).json([])
  }
}


// ================= UPDATE =================
exports.updateSetting = async (req, res) => {
  try {

    const updated = await Setting.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",   // 🔥 FIXED
        runValidators: true
      }
    )

    res.json(updated)

  } catch (err) {
    console.log(err)
    res.status(500).json({})
  }
}


// ================= DELETE =================
exports.deleteSetting = async (req, res) => {
  try {

    await Setting.findByIdAndDelete(req.params.id)

    res.json({ success: true })

  } catch (err) {
    res.status(500).json({ success: false })
  }
}