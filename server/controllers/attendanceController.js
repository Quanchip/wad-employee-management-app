import Attendance from "../models/Attendance.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: {
        path: "department",
        select: "userId",
      },
    });

    res.status(200).json({ success: true, message: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendance };