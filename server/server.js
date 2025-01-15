const express = require("express");
const bodyParser = require("body-parser");
const { login } = require("./authController");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/login", login);

app.get("/api", (req, res) => {
  res.json({ users: ["u1", "u2", "u3"] });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
