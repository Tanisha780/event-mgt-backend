const pool = require("../db");

const createEvent = async (req, res) => {
  const { title, date_time, location, capacity } = req.body;

  if (!title || !date_time || !location || !capacity) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (capacity <= 0 || capacity > 1000) {
    return res.status(400).json({ message: "Capacity must be between 1 and 1000." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO events (title, date_time, location, capacity) VALUES ($1, $2, $3, $4) RETURNING id",
      [title, date_time, location, capacity]
    );

    res.status(201).json({ event_id: result.rows[0].id });
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: "Server error while creating event." });
  }
};

module.exports = createEvent;
