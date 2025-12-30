const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  assignedLeads: { type: Number, default: 0 },
  closedLeads: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  language: String
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
