// Importing mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Importing dotenv to load environment variables from .env file
const dotenv = require('dotenv');

// Loading environment variables
dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Logging success message if connection is established
    console.log('MongoDB connected');
  } catch (error) {
    // Logging error message if connection fails
    console.error('MongoDB connection failed', error);
    // Exiting the process with failure code
    process.exit(1);
  }
};

// Exporting the connectDB function to use in other files
module.exports = connectDB;
