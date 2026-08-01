const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({

  map1: String,
  map2: String,

  siteName: String,
  logoTop: String,
  logoBottom: String,

  address: String,
  email: String,
  phone: String,
  whatsapp: String,

  facebook: String,
  twitter: String,
  linkedin: String,
  instagram: String,
  youtube: String,

  privacyPolicy: String,
  termCondition: String

}, { timestamps: true })

module.exports = mongoose.model("Setting", settingSchema)