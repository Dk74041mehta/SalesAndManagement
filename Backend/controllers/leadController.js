const Lead = require('../models/Lead');
const Employee = require('../models/Employee');
const fs = require('fs');
const csv = require('csv-parser');

const getLeads = async (req, res) => {
  const leads = await Lead.find().populate('assignedTo');
  res.json(leads);
};

const createLead = async (req, res) => {
  const leadData = req.body;

  // Assign lead automatically based on language and threshold
  const eligibleEmployees = await Employee.find({ status: 'Active', language: leadData.language }).sort({ assignedLeads: 1 });
  if (eligibleEmployees.length === 0) return res.status(400).json({ message: 'No eligible employee' });

  const employee = eligibleEmployees[0];
  employee.assignedLeads += 1;
  await employee.save();

  const lead = new Lead({ ...leadData, assignedTo: employee._id });
  await lead.save();
  res.json(lead);
};

const bulkUpload = async (req, res) => {
  const filePath = req.body.filePath; // path to CSV file

  const leads = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => leads.push(row))
    .on('end', async () => {
      for (const leadData of leads) {
        const eligibleEmployees = await Employee.find({ status: 'Active', language: leadData.language }).sort({ assignedLeads: 1 });
        if (!eligibleEmployees.length) continue;
        const employee = eligibleEmployees[0];
        employee.assignedLeads += 1;
        await employee.save();

        const lead = new Lead({ ...leadData, assignedTo: employee._id });
        await lead.save();
      }
      res.json({ message: 'Bulk upload complete' });
    });
};

module.exports = { getLeads, createLead, bulkUpload };
