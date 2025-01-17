const express = require("express");
const bodyParser = require("body-parser");
const { login } = require("./authController");
const { register } = require("./registerController");
const verifyToken = require("./middleware/authMiddleware");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/login", login);

app.post("/api/register", register);

app.get("/api/home", verifyToken, (req, res) => {
  res.json({ message: "This is protected data", userId: req.userId });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
