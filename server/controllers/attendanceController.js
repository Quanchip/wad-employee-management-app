
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// GET Today's Attendance
const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: [
        {path: "department", select: "dep_name"},
        { path: "userId", select: "name" }
      ],
    });

    res.status(200).json({ success: true, message: attendance });
  } catch (error) {
    console.error("Attendance fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE Attendance for a specific employee and date
const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Attendance update error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ATTENDANCE REPORT with optional date, limit, and skip (pagination)
const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};

    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", select: "dep_name" },
          { path: "userId", select: "name email" },
        ],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }

      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked",
      });

      return result;
    }, {});

    return res.status(201).json({ success: true, groupData });
  } catch (error) {
    console.error("Attendance report error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendance, updateAttendance, attendanceReport };

