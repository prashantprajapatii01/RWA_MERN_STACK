const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // hash later
  role: { type: String, enum: ["Admin", "Super Admin"], default: "Admin" },
  status: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model("Member", memberSchema)