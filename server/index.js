
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js' 
import salaryRouter from './routes/salary.js'
import leaveRoute from './routes/leave.js'
import attendanceRouter from './routes/attendance.js'
import settingRoute from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js' 
connectToDatabase()

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({ origin: 'http://localhost:5173' }));

// Parse JSON request bodies
app.use(express.json());

app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter) 
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRoute)
app.use('/api/setting', settingRoute)
app.use('/api/dashboard', dashboardRouter) 
app.use('/api/attendance', attendanceRouter)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})

