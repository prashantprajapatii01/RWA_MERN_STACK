const mongoose = require("mongoose");

const eventJoinSchema = new mongoose.Schema({
  name: String,
  phone: String,
  members: Number,

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notice"
  },

  eventName: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model("EventJoin", eventJoinSchema);