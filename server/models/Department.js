import mongoose from "mongoose";
import Employee from "./Employee.js"; 
import Leave from "./Leave.js"; 
import Salary from "./Salary.js";

const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true },
    description: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-delete hook for department to delete associated employees, leaves, and salaries
departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) { 
    try { 
        const employees = await Employee.find({ department: this._id }); 
        const empIds = employees.map(emp => emp._id); 

        // Deleting employees, leaves, and salaries associated with this department
        await Employee.deleteMany({ department: this._id }); 
        await Leave.deleteMany({ employeeId: { $in: empIds } }); 
        await Salary.deleteMany({ employeeId: { $in: empIds } }); // Fixed typo: empIds instead of empids

        next();
    } catch (error) { 
        next(error); 
    }
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;
