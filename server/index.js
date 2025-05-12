import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { departmentRouter } from './routes/department.js';
import { employeeRouter } from './routes/employee.js';
import connectToDatabase from './db/db.js';
import { salaryRouter } from './routes/salary.js';
import { leaveRoute } from './routes/leave.js';
import { settingRoute } from './routes/setting.js';
import { dashboardRouter } from './routes/dashboard.js';
import { attendanceRoutes } from './routes/attendance.js';

// Connect to the database
connectToDatabase();

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON request bodies
app.use(express.json());

// Serve static files from public/uploads (if the directory exists)
app.use(express.static('public/uploads'));

// Mount routes with corrected paths to match frontend expectations
app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter); // Pluralized to match frontend
app.use('/api/employees', employeeRouter);     // Pluralized to match frontend
app.use('/api/salaries', salaryRouter);        // Pluralized to match frontend
app.use('/api/leaves', leaveRoute);            // Pluralized to match frontend
app.use('/api/settings', settingRoute);        // Pluralized to match frontend
app.use('/api/dashboard', dashboardRouter);
app.use('/api/attendance', attendanceRoutes);  // Added attendance routes

// Start the server with a fallback port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});