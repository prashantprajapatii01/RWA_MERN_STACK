const express = require("express");
const router = express.Router();

const {
  createNotice,
  getNotice,
  updateNotice,
  deleteNotice
} = require("../controllers/noticeController");

// CRUD APIs
router.post("/", createNotice);
router.get("/", getNotice);
router.put("/:id", updateNotice);
router.delete("/:id", deleteNotice);

module.exports = router;