const express = require("express");
const router = express.Router();

const { createJoin } = require("../controllers/eventjoinController");

router.post("/", createJoin);

module.exports = router;
