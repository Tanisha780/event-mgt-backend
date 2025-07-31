const express = require("express");
const router = express.Router();

const createEvent = require("../controllers/createEvent");
const getEventDetails = require("../controllers/getEvents");
const registerUser = require("../controllers/registerEvent");
const cancelRegistration = require("../controllers/cancelRegisteration");
const getEventStats = require("../controllers/EventStats");
const UpcomingEvents = require("../controllers/upcomingEvents");
const createUser = require("../controllers/createUser");

router.post("/", createEvent);
router.get("/upcoming/list", UpcomingEvents);
router.get("/:id", getEventDetails);
router.post("/user", createUser);
router.post("/:id/register", registerUser);
router.delete("/:id/cancel", cancelRegistration);
router.get("/:id/stats", getEventStats);

module.exports = router;
