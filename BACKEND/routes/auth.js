// Importing express to create routes
const express = require('express');
// Importing bcryptjs for password hashing
const bcrypt = require('bcryptjs');
// Importing jwt for signing JSON Web Tokens
const jwt = require('jsonwebtoken');
// Importing the User model
const User = require('../models/User');
// Importing the auth middleware
const auth = require('../middleware/auth');
// Importing dotenv to load environment variables from .env file
const dotenv = require('dotenv');

// Loading environment variables
dotenv.config();

// Creating a router object
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  // Extracting username, email, password, and role from the request body
  const { username, email, password, role } = req.body;

  try {
    // Checking if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user exists, return 400 Bad Request
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Saving the new user to the database
    await newUser.save();

    // Signing a JWT token with the user ID and role
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Returning the token to the client
    res.status(201).json({ token });
  } catch (error) {
    // If there's a server error, return 500 Internal Server Error
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  // Extracting email and password from the request body
  const { email, password } = req.body;

  try {
    // Finding the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user not found, return 400 Bad Request
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Comparing the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords don't match, return 400 Bad Request
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Signing a JWT token with the user ID and role
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Returning the token to the client
    res.status(200).json({ token });
  } catch (error) {
    // If there's a server error, return 500 Internal Server Error
    res.status(500).json({ message: 'Server error' });
  }
});

// Exporting the router to use in other files
module.exports = router;
