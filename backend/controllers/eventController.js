const Event = require("../models/event");

// Test Endpoint
const test = (req, res) => {
  res.json("event test is working");
};

// Get flexible events 
const getEvents = async (req, res) => {
  try {
    const { limit = 5, sort = "desc", timerange } = req.query;

    const query = {};
    if (timerange) {
      const now = new Date();
      const timeAgo = new Date(now.getTime() - parseInt(timerange) * 60 * 1000);
      query.timestamp = { $gte: timeAgo };
    }

    const events = await Event.find(query)
      .sort({ timestamp: sort === "asc" ? 1 : -1 })
      .limit(parseInt(limit));

    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  test,
  getEvents,
  getEventById,
};
