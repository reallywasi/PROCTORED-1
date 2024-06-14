// Importing express to create the application
const express = require('express');
// Importing the database connection function
const connectDB = require('./config/db');
// Importing the authentication routes
const authRoutes = require('./routes/auth');
// Add other route imports here

// Creating an Express application
const app = express();

// Connecting to the database
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Defining the routes
app.use('/api/auth', authRoutes);
// Add other routes here

// Exporting the app to use in server.js
module.exports = app;
