const pool = require("../db");

const getEventStats = async (req, res) => {
  const { id: event_id } = req.params;

  try {
    //  Get event capacity
    const eventResult = await pool.query("SELECT capacity FROM events WHERE id = $1", [event_id]);
    if (eventResult.rows.length === 0) {
      return res.status(404).json({ message: "Event not found." });
    }
    const capacity = eventResult.rows[0].capacity;

    // Count total registrations
    const regResult = await pool.query(
      "SELECT COUNT(*) FROM registrations WHERE event_id = $1",
      [event_id]
    );
    const totalRegistrations = parseInt(regResult.rows[0].count);

    //  Calculate remaining capacity and percentage used
    const remainingCapacity = capacity - totalRegistrations;
    const percentageUsed = ((totalRegistrations / capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations,
      remainingCapacity,
      percentageUsed: percentageUsed + "%",
    });
  } catch (err) {
    console.error("Get event stats error:", err);
    res.status(500).json({ message: "Server error while fetching event stats." });
  }
};

module.exports = getEventStats;
