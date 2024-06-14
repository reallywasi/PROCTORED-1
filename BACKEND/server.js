// Loading environment variables
const mongoose = require('mongoose');

require('dotenv').config();
// Importing the app from app.js
const app = require('./app');

// Getting the port from environment variables or defaulting to 5000
const PORT = process.env.PORT || 5000;

// Starting the server and logging the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
