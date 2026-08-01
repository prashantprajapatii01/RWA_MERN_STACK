const express = require("express")
const router = express.Router()

const {
  createResident,
  getResident,
  getSingleResident,
  updateResident,
  deleteResident
} = require("../controllers/residentController")

// BASE: /api/resident

router.post("/", createResident)
router.get("/", getResident)
router.get("/:id", getSingleResident)
router.put("/:id", updateResident)
router.delete("/:id", deleteResident)

module.exports = router