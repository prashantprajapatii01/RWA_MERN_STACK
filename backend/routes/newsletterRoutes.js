const express = require("express")
const router = express.Router()

const {
  createNewsletter,
  getNewsletter,
  getSingleNewsletter,
  updateNewsletter,
  deleteNewsletter
} = require("../controllers/newsletterController")

// BASE → /api/newsletter

router.post("/", createNewsletter)
router.get("/", getNewsletter)
router.get("/:id", getSingleNewsletter)
router.put("/:id", updateNewsletter)
router.delete("/:id", deleteNewsletter)

module.exports = router