const express = require("express")
const router = express.Router()

const {
  createMember,
  getMembers,
  updateMember,
  deleteMember
} = require("../controllers/membersController")

// /api/members
router.post("/", createMember)
router.get("/", getMembers)
router.put("/:id", updateMember)
router.delete("/:id", deleteMember)

module.exports = router