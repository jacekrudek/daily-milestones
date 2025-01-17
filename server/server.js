const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const { login } = require("./authController");
const { register } = require("./registerController");
const verifyToken = require("./middleware/authMiddleware");
const app = express();
const port = 5000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "daily-milestones",
  password: "sysop",
  port: 5432,
});

app.use(bodyParser.json());

app.post("/api/login", login);

app.post("/api/register", register);

app.get("/api/home", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("User ID from token:", userId); // Log the user ID

    const result = await pool.query(
      "SELECT * FROM user_goals WHERE user_id = $1",
      [userId]
    );
    console.log("Database query result:", result); // Log the query result

    const userData = result.rows;

    res.json({ message: "This is protected data", userId, userData });
  } catch (error) {
    console.error("Error retrieving user data:", error.message);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
