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
import taskRouter from './routes/task.js'
import mailerRouter from './routes/mailer.js'
import session from 'express-session'
import teamRouter from './routes/team.js'
connectToDatabase()

const app = express()

// Configure CORS to allow requests from the frontend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
// Parse JSON request bodies
app.use(
  session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    },
  })
)

app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRoute)
app.use('/api/setting', settingRoute)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/task', taskRouter)
app.use('/api/mail', mailerRouter)
app.use('/api/team', teamRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
