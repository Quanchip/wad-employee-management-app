import Department from '../models/Department.js'
import Employee from '../models/Employee.js'
import Leave from '../models/Leave.js'
import Salary from '../models/Salary.js'

const getSummary = async (req, res) => {
  console.log('=== DASHBOARD CONTROLLER START ===');
  try {
    console.log('1. Starting getSummary function');
    
    const totalEmployees = await Employee.countDocuments()
    console.log('2. Total employees:', totalEmployees);
    
    const totalDepartments = await Department.countDocuments()
    console.log('3. Total departments:', totalDepartments);

    // Get all salary records for debugging
    const allSalaries = await Salary.find({}).populate('employeeId', 'employeeId');
    console.log('4. Found salary records:', allSalaries.length);

    // Calculate total salary from Salary collection
    const totalSalaries = await Salary.aggregate([
      {
        $match: {
          netSalary: { $exists: true }
        }
      },
      {
        $group: {
          _id: null,
          totalSalary: { $sum: { $toDouble: '$netSalary' } },
          count: { $sum: 1 }
        }
      }
    ])
    console.log('5. Salary aggregation result:', totalSalaries);

    const employeeAppliedForLeave = await Leave.distinct('employeeId')
    console.log('6. Employees who applied for leave:', employeeAppliedForLeave.length);

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])
    console.log('7. Leave status counts:', leaveStatus);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find((item) => item._id === 'Approved')?.count || 0,
      rejected: leaveStatus.find((item) => item._id === 'Rejected')?.count || 0,
      pending: leaveStatus.find((item) => item._id === 'Pending')?.count || 0,
    }

    const response = {
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary,
    }
    console.log('8. Sending response:', response);
    console.log('=== DASHBOARD CONTROLLER END ===');

    return res.status(200).json(response)
  } catch (error) {
    console.error('ERROR in getSummary:', error)
    return res
      .status(500)
      .json({ 
        success: false, 
        error: 'dashboard summary error',
        details: error.message 
      })
  }
}

export { getSummary }
