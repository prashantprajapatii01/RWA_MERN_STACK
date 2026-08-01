const EventJoin = require("../models/EventJoin");

exports.createJoin = async (req, res) => {
  try {

    const { name, phone, members, eventId, eventName } = req.body;

    // ✅ Validation
    if (!name || !phone || !members || !eventId || !eventName) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // 🔥 ADD THIS HERE (IMPORTANT)
    const existing = await EventJoin.findOne({ phone, eventId });

    if (existing) {
      return res.json({
        success: false,
        message: "Already joined this event"
      });
    }

    // ✅ Create new entry
    const join = await EventJoin.create({
      name,
      phone,
      members,
      eventId,
      eventName,
      date: new Date()
    });

    res.json({
      success: true,
      message: "Joined successfully",
      data: join
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};