const express = require("express")
const router = express.Router()

const {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController")

// BASE → /api/events

router.post("/", createEvent)
router.get("/", getEvents)
router.get("/:id", getSingleEvent)
router.put("/:id", updateEvent)
router.delete("/:id", deleteEvent)

module.exports = router