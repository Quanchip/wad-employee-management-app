import Attendance from '../db/models/Attendance.js';
import Employee from '../db/models/Employee.js';

export const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    const employee = await Employee.findOne({ employeeId });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const attendance = new Attendance({
      employeeId,
      employeeName: employee.name,
      department: employee.department,
      date,
      status,
    });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error marking attendance' });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { date, page = 1 } = req.query;
    const limit = 5; // Rows per page
    const skip = (page - 1) * limit;

    const records = await Attendance.find({ date })
      .skip(skip)
      .limit(limit);
    const totalRecords = await Attendance.countDocuments({ date });
    const totalPages = Math.ceil(totalRecords / limit);

    res.json({ records, totalPages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report' });
  }
};