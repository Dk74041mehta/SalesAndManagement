const fs = require('fs');
const csv = require('csv-parser');
const Lead = require('../models/Lead');
const Employee = require('../models/Employee');

/**
 * Bulk upload leads from CSV file
 * @param {string} filePath - Path to CSV file
 */
const assignLeadsFromCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const leads = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => leads.push(row))
      .on('end', async () => {
        try {
          for (const leadData of leads) {
            // Find eligible employees by language and lowest assigned leads
            const eligibleEmployees = await Employee.find({ status: 'Active', language: leadData.language }).sort({ assignedLeads: 1 });

            if (!eligibleEmployees.length) continue;

            const employee = eligibleEmployees[0]; // Round-robin / lowest assigned logic
            employee.assignedLeads += 1;
            await employee.save();

            const lead = new Lead({
              name: leadData.name,
              email: leadData.email,
              source: leadData.source,
              date: new Date(leadData.date),
              location: leadData.location,
              language: leadData.language,
              assignedTo: employee._id,
              status: 'Ongoing'
            });

            await lead.save();
          }

          resolve({ message: 'CSV processed and leads assigned.' });
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => reject(err));
  });
};

module.exports = assignLeadsFromCSV;
