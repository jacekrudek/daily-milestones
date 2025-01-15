const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "daily-milestones",
  password: "sysop",
  port: 5432,
});

const JWT_SECRET = "your_jwt_secret";

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash the password
    const password_hashed = await bcrypt.hash(password, 10);

    // Query the database to find the user by email
    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2)",
      [email, password_hashed]
    );

    // Check if the insert operation was successful
    if (result.rowCount === 0) {
      return res.status(500).json({ message: "Failed to register user" });
    }

    // Return the user ID and token
    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register };
