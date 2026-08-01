const express = require("express")
const router = express.Router()

const {
  createContactUs,
  getContactUs,
  getSingleContactUs,
  updateContactUs,
  deleteContactUs
} = require("../controllers/contactUsController")

// BASE → /api/contactus

router.post("/", createContactUs)
router.get("/", getContactUs)
router.get("/:id", getSingleContactUs)
router.put("/:id", updateContactUs)
router.delete("/:id", deleteContactUs)

module.exports = router