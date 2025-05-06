import Attendance from "../models/Attendance.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: {
        path: "department",
        select: "userId name", // show userId and department name
      },
    });

    res.status(200).json({ success: true, message: attendance });
  } catch (error) {
    console.error("Attendance fetch error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
 

const updateAttendance = async (req, res) => { 
    try { 
      const {employeeId} = req.params 
      const{status} = req.body 
      const date = new Date(). toISOString().split('T')[0] 
      const employee = await Employee.findOne({employeeId}) 

      const attendance = await Attendance.findOneAndUpdate({employeeId:employee._id, date}, {status}, {new: true}) 

      res.status(200).json({success:true, attendance}) 
    } catch (error) { 
      res.status(500).json({success:false, message: error.message})
    }
}

export { getAttendance, updateAttendance};