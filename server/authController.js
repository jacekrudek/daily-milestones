const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate hashed passwords for demonstration purposes
const hashedPassword1 = bcrypt.hashSync("password1", 10);
const hashedPassword2 = bcrypt.hashSync("password2", 10);

const users = [
  {
    email: "user1@example.com",
    password: hashedPassword1,
  },
  {
    email: "user2@example.com",
    password: "$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8",
    password: hashedPassword2,
  },
];

const JWT_SECRET = "your_jwt_secret";

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Find the user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

module.exports = { login };
