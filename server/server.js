const express = require("express");
const bodyParser = require("body-parser");
const { login } = require("./authController");
const { register } = require("./registerController");
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.post("/api/login", login);

app.post("/api/register", register);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
