// Importing mongoose to define the schema
const mongoose = require('mongoose');

// Defining the Question schema
const questionSchema = new mongoose.Schema({
  // Exam field, references the Exam ID this question belongs to
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  // Type field, must be 'MCQ', 'Theory', or 'Coding'
  type: { type: String, enum: ['MCQ', 'Theory', 'Coding'], required: true },
  // Content field, the actual question text, required
  content: { type: String, required: true },
  // Options field, an array of strings (for MCQ type questions)
  options: [{ type: String }],
  // CorrectAnswer field, the correct answer (for MCQ type questions)
  correctAnswer: { type: String },
  // Timestamp for when the question was created
  createdAt: { type: Date, default: Date.now },
});

// Creating a model from the schema
const Question = mongoose.model('Question', questionSchema);

// Exporting the model to use in other files
module.exports = Question;
