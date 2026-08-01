// const Complaint = require("../models/Complaint")

// // CREATE
// exports.createComplaint = async (req, res) => {
//   try {
//     const complaint = await Complaint.create(req.body)
//     res.status(201).json(complaint)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // GET ALL
// exports.getComplaint = async (req, res) => {
//   try {
//     const data = await Complaint.find().sort({ createdAt: -1 })
//     res.json(data)
//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // GET SINGLE (optional)
// exports.getSingleComplaint = async (req, res) => {
//   try {
//     const item = await Complaint.findById(req.params.id)
//     if (!item) return res.status(404).json({ message: "Not found" })
//     res.json(item)
//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }

// // // UPDATE
// // exports.updateComplaint = async (req, res) => {
// //   try {
// //     const updated = await Complaint.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { returnDocument: "after" }
// //     )

// //     res.json(updated)
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" })
// //   }
// // }
// exports.updateComplaint = async (req, res) => {

//   const complaint = await Complaint.findById(req.params.id)

//   // prevent user from changing status/payment
//   if (req.body.userId && req.body.userId !== complaint.userId.toString()) {
//     return res.status(403).json({ message: "Unauthorized" })
//   }

//   const updated = await Complaint.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   )

//   res.json(updated)
// }
// // DELETE
// exports.deleteComplaint = async (req, res) => {
//   try {
//     await Complaint.findByIdAndDelete(req.params.id)
//     res.json({ message: "Complaint deleted successfully" })
//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }
// }

const Complaint = require("../models/Complaint")

// ================= CREATE =================
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body)
    res.status(201).json(complaint)
  } catch (err) {
    console.log(err)
    res.status(500).json([]) // always return array-safe
  }
}

// ================= GET (ROLE BASED) =================
exports.getComplaint = async (req, res) => {
  try {
    const { userId } = req.query

    let data

    if (userId) {
      // 👤 USER → only own complaints
      data = await Complaint.find({ userId }).sort({ createdAt: -1 })
    } else {
      // 👨‍💼 ADMIN → all complaints
      data = await Complaint.find().sort({ createdAt: -1 })
    }

    res.json(data || [])
  } catch (err) {
    console.log(err)
    res.status(500).json([]) // 🔥 always array
  }
}

// ================= GET SINGLE =================
exports.getSingleComplaint = async (req, res) => {
  try {
    const item = await Complaint.findById(req.params.id)

    if (!item) return res.status(404).json({})

    res.json(item)
  } catch (err) {
    res.status(500).json({})
  }
}

// ================= UPDATE (SECURE) =================
exports.updateComplaint = async (req, res) => {
  try {
    const { userId } = req.query

    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) {
      return res.status(404).json({})
    }

    // 🚫 user cannot edit others
    if (userId && complaint.userId.toString() !== userId) {
      return res.status(403).json({})
    }

    // 🚫 user cannot update payment
    if (userId) {
      delete req.body.paymentStatus
      delete req.body.paymentAmount
    }

    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    )

    res.json(updated)
  } catch (err) {
    console.log(err)
    res.status(500).json({})
  }
}

// ================= DELETE =================
exports.deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false })
  }
}