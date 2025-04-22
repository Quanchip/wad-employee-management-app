import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'
const addLeave = async(req,res) => {
    try { 
        const {userId, leaveType, startDate, endDate, reason} = req.body 
        const employee = await Employee.findOne({userId});

        if (!employee){
            return res.status(404).json({ success: false, error: 'Employee not found' });    
        }

        const newLeave = new Leave({
            employeeId: employee._id, leaveType, startDate, endDate, reason
        }) 

        await newLeave.save() 

        return res.status(200).json({success: true}) 

        } catch (error) { 
        console.error(error) 
        return res.status(500).json({success: false, error: 'Server Error'})
    }
}


const getLeave = async(req,res) => {
    try { 
        const {id} = req.params
        const employee = await Employee.findOne({userId: id})
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }
        const leaves =  await Leave.find({employeeId: employee._id})
        return res.status(200).json({success: true,leaves}) 
        } catch (error) { 
        console.error(error) 
        return res.status(500).json({success: false, error: 'Server Error'})
    }
}

const getLeaves = async (req, res) => {
    try { 
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {   
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        })

        return res.status(200).json({success: true,leaves}) 
        } catch (error) { 
        console.error(error) 
        return res.status(500).json({success: false, error: 'Server Error'})
    }
}

export {addLeave, getLeave, getLeaves}