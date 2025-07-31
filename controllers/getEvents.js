const pool = require("../db");

const getEvents = async (req, res) => {
  const { id: event_id } = req.params;

  try {
    const eventResult = await pool.query("SELECT * FROM events WHERE id = $1", [event_id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: "Event not found." });
    }
    const event = eventResult.rows[0];

    // Get registered users
    const usersResult = await pool.query(
      `SELECT u.id, u.name, u.email 
       FROM users u
       JOIN registrations r ON u.id = r.user_id
       WHERE r.event_id = $1`,
      [event_id]
    );

    const registeredUsers = usersResult.rows;
    res.json({
      event,
      registeredUsers,
    });
  } catch (err) {
    console.error("Get event details error:", err);
    res.status(500).json({ message: "Server error while fetching event details." });
  }
};

module.exports = getEvents;
