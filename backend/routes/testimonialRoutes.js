const express = require("express")
const router = express.Router()

const {
  createTestimonial,
  getTestimonials,
  updateTestimonial,
  deleteTestimonial
} = require("../controllers/testimonialController")

router.post("/", createTestimonial)
router.get("/", getTestimonials)
router.put("/:id", updateTestimonial)
router.delete("/:id", deleteTestimonial)

module.exports = router