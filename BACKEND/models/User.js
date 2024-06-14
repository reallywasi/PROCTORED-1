// Importing mongoose to define the schema
const mongoose = require('mongoose');

// Defining the User schema
const userSchema = new mongoose.Schema({
  // Username field, required and unique
  username: { type: String, required: true, unique: true, trim: true },
  // Email field, required and unique
  email: { type: String, required: true, unique: true, trim: true },
  // Password field, required
  password: { type: String, required: true },
  // Role field, must be either 'student' or 'examiner'
  role: { type: String, enum: ['student', 'examiner'], required: true },
  // Timestamp for when the user was created
  createdAt: { type: Date, default: Date.now },
});

// Creating a model from the schema
const User = mongoose.model('User', userSchema);

// Exporting the model to use in other files
module.exports = User;
