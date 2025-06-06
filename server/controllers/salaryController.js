import Employee from '../models/Employee.js'
import Salary from '../models/Salary.js'; 

const addSalary = async (req, res) => { 
    try { 
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body 
        console.log('Received salary data:', {employeeId, basicSalary, allowances, deductions, payDate});

        // Validate required fields
        if (!employeeId || !basicSalary || !payDate) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        // Convert to numbers and handle decimals
        const basic = parseFloat(basicSalary) || 0;
        const allowance = parseFloat(allowances) || 0;
        const deduction = parseFloat(deductions) || 0;
        
        const totalSalary = basic + allowance - deduction;
        console.log('Calculated total salary:', {
            basic,
            allowance,
            deduction,
            total: totalSalary
        });

        const newSalary = new Salary({
            employeeId,
            basicSalary: basic,
            allowances: allowance,
            deductions: deduction,
            netSalary: totalSalary,
            payDate
        }) 

        const savedSalary = await newSalary.save() 
        console.log('Saved salary record:', savedSalary);

        return res.status(200).json({
            success: true,
            salary: savedSalary
        }) 

    } catch (error) { 
        console.error('Error in addSalary:', error) 
        return res.status(500).json({
            success: false, 
            error: 'Server Error',
            details: error.message
        })
    }
} 

const getSalary = async (req, res) => { 
    try { 
        const {id, role} = req.params
        console.log('Getting salary for:', {id, role});
        
        let salary
        if (role === "admin") {
            salary = await Salary.find({employeeId : id}).populate('employeeId','employeeId');
        } else {
            const employee = await Employee.findOne({userId : id})
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    error: 'Employee not found'
                });
            }
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId')
        }
        
        console.log('Found salary records:', salary);
        return res.status(200).json({success: true, salary}) 
    } catch (error) { 
        console.error('Error in getSalary:', error) 
        return res.status(500).json({
            success: false, 
            error: 'salary get Error',
            details: error.message
        })
    }
} 

export {addSalary, getSalary};