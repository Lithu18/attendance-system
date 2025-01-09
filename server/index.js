const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Server setup
const app = express();
const PORT = 3000;
const SECRET_KEY = 'hardcoded_key';

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Mock data
const users = [
    { username: 'admin', password: 'password123' },
    { username: 'teacher', password: 'teach123' },
];
  
// Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Validate username and password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
  
    if (user) {
      // Generate JWT token
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });