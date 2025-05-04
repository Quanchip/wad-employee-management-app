const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['present', 'absent', 'sick', 'leave'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);