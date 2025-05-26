import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path"
import Department from '../models/Department.js' 

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
}) 

// Configure multer upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
        }
    }
})

const addEmployee = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);

        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Validate required fields
        if (!name || !email || !employeeId || !dob || !gender || !designation || !department || !salary || !password || !role) {
            return res.status(400).json({
                success: false,
                error: "All fields are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: "Invalid email format"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Email already registered"
            });
        }

        // Check if employeeId already exists
        const existingEmployee = await Employee.findOne({ employeeId });
        if (existingEmployee) {
            return res.status(400).json({
                success: false,
                error: "Employee ID already exists"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });

        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        // Create new employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        const savedEmployee = await newEmployee.save();
        console.log('Saved employee:', savedEmployee);

        return res.status(200).json({
            success: true,
            message: "Employee created successfully",
            data: {
                user: {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role
                },
                employee: {
                    _id: savedEmployee._id,
                    employeeId: savedEmployee.employeeId,
                    designation: savedEmployee.designation
                }
            }
        });

    } catch (error) {
        console.error('Error in addEmployee:', error);
        return res.status(500).json({
            success: false,
            error: error.message || "Server error in adding employee"
        });
    }
}

const getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find()
        .populate('userId', '-password') // also good to exclude password
        .populate('department');
  
      res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };
  

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        let employee;
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate("department")
        if(!employee) {
           employee =  await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate("department")
        }
        return res.status(200).json({success:true, employee})
     } catch (error) {
        return res.status(500).json({success:false, error:"Error server get employees"})
     }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id})

        if(!employee) {
            return res.status(404).json({success:false, error:"employee not found"})
        }
        const user = await User.findById({_id: employee.userId})
        if (!user) {
            return res.status(404).json({success:false, error:"user not found"})
        }
        
        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
             maritalStatus, designation, salary, department
        })

        if (!updateEmployee || !updateUser){
            return res.status(404).json({success:false, error:"document not found"})
        }

        return res.status(200).json({success: true, message: "employee updated"})

    } catch (error) {
        return res.status(500).json({success:false, error:"update employees server error"})
    }
} 

const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params;
    try {
        const employees = await Employee.find({department: id})
        return res.status(200).json({success:true, employees})
     } catch (error) {
        return res.status(500).json({success:false, error:"Error server get employeesbyDepId"})
     }
}

export {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId}