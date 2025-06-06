const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test, getEvents, getEventById } = require("../controllers/eventController");

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

router.get("/", test);
router.get("/events", getEvents);
router.get('/events/:id', getEventById);

module.exports = router;
