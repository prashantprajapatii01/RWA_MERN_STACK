const express = require("express");
const router = express.Router();

const { createJoin } = require("../controllers/eventJoinController");

router.post("/", createJoin);

module.exports = router;