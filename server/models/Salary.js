import mongoose from 'mongoose';

const { Schema } = mongoose;

const salarySchema = new Schema(
    { 
        departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true }, // Fixed
        employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
        basicSalary: { type: Number, required: true },
        allowance: { type: Number, default: 0 }, // Fixed to match frontend
        deductions: { type: Number, default: 0 },
        payDate: { type: Date, required: true },
    },
    { timestamps: true } // Handles createdAt & updatedAt automatically
);

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;
