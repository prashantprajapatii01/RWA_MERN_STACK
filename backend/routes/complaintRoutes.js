const express = require("express")
const router = express.Router()

const {
  createComplaint,
  getComplaint,
  getSingleComplaint,
  updateComplaint,
  deleteComplaint
} = require("../controllers/complaintController")

// ================= ROUTES =================

// CREATE
router.post("/", createComplaint)

// GET (userId comes from query)
router.get("/", getComplaint)

// GET SINGLE
router.get("/:id", getSingleComplaint)

// UPDATE (userId used for security)
router.put("/:id", updateComplaint)

// DELETE (admin use)
router.delete("/:id", deleteComplaint)

module.exports = router