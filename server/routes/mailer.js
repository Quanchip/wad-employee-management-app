import express from 'express'
import { sendMail } from '../mail.js'
import Task from '../models/Task.js'
const router = express.Router()

router.post('/set-email', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email is required' })
  req.session.userEmail = email
  res.json({ message: 'Email saved to session' })
})

router.post('/send-new-password', async (req, res) => {
  const email = req.session.userEmail
  if (!email)
    return res.status(400).json({ message: 'Email not found in session' })

  const { password, key } = req.body
  if (!password || !key)
    return res.status(400).json({ message: 'Password and key are required' })

  req.session.password = password

  try {
    await sendMail({
      to: email,
      subject: '🔐 Your New Password & Verification Code',
      text: `Dear Employee,\n\nYour new login credentials are provided below. Please keep this information confidential.\n\nPassword: ${password}\nVerification Code: ${key}\n\nDo not share this email with anyone.\n\nRegards,\nIT Department`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f2f4f6; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background-color: #003366; color: white; padding: 20px 30px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
              <h2 style="margin: 0;">Confidential Login Credentials</h2>
            </div>
            <div style="padding: 30px;">
              <p>Dear <strong>Employee</strong>,</p>
              <p>You have received new login credentials. Please store them securely and do <strong>not share</strong> them with anyone.</p>
              <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
                <p style="margin: 0;"><strong>Password:</strong> <span style="letter-spacing: 1px;">${password}</span></p>
                <p style="margin: 8px 0 0;"><strong>Verification Code:</strong> <span style="letter-spacing: 1px;">${key}</span></p>
              </div>
              <p style="font-size: 13px; color: #888;">These credentials are temporary and intended for your use only. For security purposes, change your password after first login.</p>
              <p style="margin-top: 30px;">Sincerely,<br><strong>IT Department</strong><br>Your Company</p>
            </div>
          </div>
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      `,
    })

    res.json({ message: 'New password email sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to send new password email' })
  }
})

router.post('/send-task-notify/:id', async (req, res) => {
  const {id} = req.params
  const {task_name } = req.body
  if (!task_name)
    return res.status(400).json({ message: 'Email and task are required' })
  const email = await Task.findById({_id:id}).populate({
    path: 'employeeId',
    populate: {
      path: 'userId',
      select: 'email',
    },
  })

  try {
    await sendMail({
      to: email,
      subject: '📌 New Task Assigned: ' + task_name,
      text: `Dear Employee,\n\nYou have been assigned a new task: ${task_name}.\nPlease check your task dashboard for details.\n\nBest regards,\nCompany Management`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f4f6f8; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="background-color: #004aad; color: white; padding: 16px 24px;">
              <h2 style="margin: 0;">New Task Notification</h2>
            </div>
            <div style="padding: 24px;">
              <p>Dear <strong>Employee</strong>,</p>
              <p>We would like to inform you that you have been assigned a new task:</p>
              <p style="font-size: 18px; font-weight: bold; color: #004aad; margin: 16px 0;">${task_name}</p>
              <p>Please log in to web page company style="color: #004aad; text-decoration: none;">task dashboard</a> to view the full details and get started.</p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 13px; color: #888;">If you have any questions, please contact your supervisor or the HR department.</p>
              <p style="margin-top: 32px;">Best regards,<br><strong>Your Company Management Team</strong></p>
            </div>
          </div>
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 24px;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      `,
    })

    res.json({ message: 'Task notification sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to send task notification' })
  }
})

router.get('/getSessionServer', async (req, res) => {
  try {
    const email = req.session.userEmail
    return res
      .status(200)
      .json({ message: 'Successfully take session from server', email })
  } catch (error) {
    res.status(500).json({ message: 'Failed to get session from server' })
  }
})

export default router
