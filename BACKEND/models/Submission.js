// Importing mongoose to define the schema
const mongoose = require('mongoose');

// Defining the Submission schema
const submissionSchema = new mongoose.Schema({
  // Exam field, references the Exam ID this submission belongs to
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  // Student field, references the User ID of the student who made the submission
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Answers field, an array of objects containing question ID and the student's answer
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answer: { type: String, required: true },
  }],
  // TabSwitchCount field, counts how many times the student switched tabs
  tabSwitchCount: { type: Number, default: 0 },
  // Penalties field, stores penalty points based on tab switches or other criteria
  penalties: { type: Number, default: 0 },
  // Timestamp for when the submission was made
  submittedAt: { type: Date, default: Date.now },
});

// Creating a model from the schema
const Submission = mongoose.model('Submission', submissionSchema);

// Exporting the model to use in other files
module.exports = Submission;
