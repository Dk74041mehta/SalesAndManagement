const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  source: String,
  date: Date,
  location: String,
  language: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, enum: ['Ongoing', 'Closed'], default: 'Ongoing' },
  type: { type: String, enum: ['Hot', 'Warm', 'Cold', 'Scheduled'], default: 'Warm' },
  scheduledDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
