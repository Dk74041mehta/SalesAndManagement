const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
};

const deleteEmployees = async (req, res) => {
  const { ids } = req.body; // array of employee _id
  await Employee.deleteMany({ _id: { $in: ids } });
  res.json({ message: 'Deleted successfully' });
};

module.exports = { getEmployees, createEmployee, deleteEmployees };
