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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user by email
    const result = await pool.query(
      "SELECT id, password_hash FROM users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Log the password and password_hash for debugging
    console.log("Password from request:", password);
    console.log("Password hash from database:", user.password_hash);

    const passwordString = String(password);
    const passwordHashString = String(user.password_hash);

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the user ID and token
    return res.json({ userId: user.id, token });
  } catch (error) {
    console.log("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
