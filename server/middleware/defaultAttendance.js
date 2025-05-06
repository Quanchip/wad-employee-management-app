import Attendance from "../models/Attendance";
import Employee from '../models/Employee';

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendance.findOne({ date });

        if (!existingAttendance) {
            const employees = await Employee.find({}); // Fixed: EmployeeButtons -> Employee
            const attendance = employees.map(employee => ({
                date,
                employeeId: employee._id,
                status: null // Fixed typo: 'staus' -> 'status'
            }));

            // Create attendance records for each employee
            await Attendance.insertMany(attendance); // Save the attendance records

            next(); // Proceed to the next middleware
        } else {
            // If attendance already exists, proceed without doing anything
            next();
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default defaultAttendance;
