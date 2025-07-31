const pool = require("../db");

const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );
    res.status(201).json({ user: result.rows[0], message: "User created successfully." });
  } catch (err) {
    console.error("Error creating user:", err);
    if (err.code === "23505") {
      // Duplicate email
      return res.status(400).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Server error while creating user." });
  }
};

module.exports = createUser;
