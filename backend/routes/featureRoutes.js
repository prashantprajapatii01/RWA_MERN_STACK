const express = require("express")
const router = express.Router()

const {
  createFeature,
  getFeature,
  getSingleFeature,
  updateFeature,
  deleteFeature
} = require("../controllers/featureController")

// BASE → /api/feature

router.post("/", createFeature)
router.get("/", getFeature)
router.get("/:id", getSingleFeature)
router.put("/:id", updateFeature)
router.delete("/:id", deleteFeature)

module.exports = router