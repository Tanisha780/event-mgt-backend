const pool = require("../db");

const cancelRegistration = async (req, res) => {
  const { user_id } = req.body;      // User ID jo cancel karna hai
  const { id: event_id } = req.params;  // Event ID from URL param

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Check if registration exists
    const registration = await pool.query(
      "SELECT * FROM registrations WHERE user_id = $1 AND event_id = $2",
      [user_id, event_id]
    );

    if (registration.rows.length === 0) {
      return res.status(404).json({ message: "User is not registered for this event." });
    }

    // Delete the registration
    await pool.query(
      "DELETE FROM registrations WHERE user_id = $1 AND event_id = $2",
      [user_id, event_id]
    );

    res.status(200).json({ message: "Registration cancelled successfully." });
  } catch (err) {
    console.error("Cancel registration error:", err);
    res.status(500).json({ message: "Server error while cancelling registration." });
  }
};

module.exports = cancelRegistration;
