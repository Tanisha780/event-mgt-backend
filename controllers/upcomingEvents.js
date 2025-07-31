const pool = require("../db");

const UpcomingEvents = async (req, res) => {
  try {
    const now = new Date();

    const result = await pool.query(
      `SELECT * FROM events
       WHERE date_time > $1
       ORDER BY date_time ASC, location ASC`,
      [now]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("List upcoming events error:", err);
    res.status(500).json({ message: "Server error while fetching upcoming events." });
  }
};

module.exports = UpcomingEvents;
