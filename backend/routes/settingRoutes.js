const express = require("express")
const router = express.Router()

const {
  createSetting,
  getSetting,
  updateSetting,
  deleteSetting
} = require("../controllers/settingController")

router.post("/", createSetting)
router.get("/", getSetting)
router.put("/:id", updateSetting)
router.delete("/:id", deleteSetting)

module.exports = router