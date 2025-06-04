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
        return res.status(500).json({success: false, error: 'Add leave Server Error'})
    }
}


const getLeave = async(req,res) => {
    try { 
        const {id, role} = req.params;
        let leaves;
        if (role === "admin") {
            leaves = await Leave.find({employeeId: id})
        } 
        else{
            const employee = await Employee.findOne({userId: id})
            leaves =  await Leave.find({employeeId: employee._id})
        }
        

        return res.status(200).json({success: true, leaves}) 
        } catch (error) { 
        console.error(error) 
        return res.status(500).json({success: false, error: 'Get leave Server Error'})
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
                    select: 'name profileImage'
                }
            ]
        })

        return res.status(200).json({success: true,leaves}) 
        } catch (error) { 
        console.error(error) 
        return res.status(500).json({success: false, error: 'Get leaves Server Error'})
    }
}


const getLeaveDetail = async (req, res) => {
    try { 
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate: [
                {   
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name, profileImage'
                }
            ]
        })

        return res.status(200).json({success: true, leave}) 
        } catch (error) { 
            console.error(error) 
            return res.status(500).json({success: false, error: 'Get leave detail Server Error'})
    }
}

const updateLeaveStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success: false, error: 'Leave not founded'}) 
        }
        return res.status(200).json({success: true})

    } catch (error) {
        console.error(error) 
        return res.status(500).json({success: false, error: 'Update Leave status Server Error'})
    }
}


export {addLeave, getLeave, getLeaves, getLeaveDetail, updateLeaveStatus}


