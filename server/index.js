const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 3000;
const SECRET_KEY = "mySecretKey30"; // Replace with a secure key

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Load users
const users = JSON.parse(fs.readFileSync("users.json"));

// Login API
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
