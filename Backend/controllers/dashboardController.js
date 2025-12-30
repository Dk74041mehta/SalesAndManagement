const Lead = require('../models/Lead');
const Employee = require('../models/Employee');

const getDashboard = async (req, res) => {
  const totalUnassigned = await Lead.countDocuments({ assignedTo: null });
  const assignedThisWeek = await Lead.countDocuments({
    assignedTo: { $ne: null },
    createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
  });
  const activeSales = await Employee.countDocuments({ status: 'Active' });

  const totalAssigned = await Lead.countDocuments({ assignedTo: { $ne: null } });
  const closedLeads = await Lead.countDocuments({ status: 'Closed' });
  const conversionRate = totalAssigned > 0 ? (closedLeads / totalAssigned) * 100 : 0;

  res.json({
    totalUnassigned,
    assignedThisWeek,
    activeSales,
    conversionRate
  });
};

module.exports = { getDashboard };
