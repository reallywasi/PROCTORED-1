// Importing mongoose to define the schema
const mongoose = require('mongoose');

// Defining the ScreenMonitoring schema
const screenMonitoringSchema = new mongoose.Schema({
  // Student field, references the User ID of the student being monitored
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Examiner field, references the User ID of the examiner monitoring the student
  examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Exam field, references the Exam ID during which the monitoring is happening
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  // Timestamp for when the monitoring occurred
  timestamp: { type: Date, default: Date.now },
  // Screenshot field, stores the URL or base64 encoded string of the screenshot
  screenshot: { type: String },
});

// Creating a model from the schema
const ScreenMonitoring = mongoose.model('ScreenMonitoring', screenMonitoringSchema);

// Exporting the model to use in other files
module.exports = ScreenMonitoring;
