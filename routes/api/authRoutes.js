// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
