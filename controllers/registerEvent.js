const pool = require("../db");

const registerEvent = async (req, res) => {
  const { user_id } = req.body;
  const { id: event_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }
console.log(req.params);
console.log(req.body);
  try {
    // Check if event exists
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [event_id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: "Event not found." });
    }

    const event = eventResult.rows[0];

    // Check if event date_time is in the past
    const now = new Date();
    const eventDate = new Date(event.date_time);
    if (eventDate < now) {
      return res.status(400).json({ message: "Cannot register for past events." });
    }

    // Check if user already registered for this event
    const existingRegistration = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2",
      [user_id, event_id]
    );

    if (existingRegistration.rows.length > 0) {
      return res.status(400).json({ message: "User already registered for this event." });
    }

    // Check if event capacity is full
    const registrationCount = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id = $1",
      [event_id]
    );

    if (parseInt(registrationCount.rows[0].count) >= event.capacity) {
      return res.status(400).json({ message: "Event capacity full." });
    }

    // Register the user
    await pool.query(
      "INSERT INTO registrations (user_id, event_id) VALUES ($1, $2)",
      [user_id, event_id]
    );

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Register user error:", err);
    res.status(500).json({ message: "Server error while registering user." });
  }
};

module.exports = registerEvent;
