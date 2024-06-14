// Importing mongoose to define the schema
const mongoose = require('mongoose');

// Defining the Exam schema
const examSchema = new mongoose.Schema({
  // Title field, required
  title: { type: String, required: true, trim: true },
  // Description field, optional
  description: { type: String, trim: true },
  // Duration field, required (in minutes)
  duration: { type: Number, required: true },
  // Questions field, an array of Question IDs
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  // CreatedBy field, references the User who created the exam
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Timestamp for when the exam was created
  createdAt: { type: Date, default: Date.now },
});

// Creating a model from the schema
const Exam = mongoose.model('Exam', examSchema);

// Exporting the model to use in other files
module.exports = Exam;
