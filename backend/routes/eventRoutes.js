const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, getRecentEvents } = require("../controllers/eventController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/", test);
router.get("/events", getRecentEvents);

module.exports = router;
