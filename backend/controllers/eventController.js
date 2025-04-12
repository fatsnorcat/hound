const Event = require("../models/event");

// Test Endpoint
const test = (req, res) => {
  res.json("event test is working");
};

// Get 5 Recent Events
const getRecentEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ timestamp: -1 })
      .limit(5); // 5 most recent

    res.json(events); // Let frontend handle formatting
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  test,
  getRecentEvents,
};
