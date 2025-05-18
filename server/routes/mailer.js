import express from 'express'
import { sendMail } from '../mail.js'

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
      subject: 'Your New Password and Confirmation Key',
      text: `Your new password is: ${password}\nYour confirmation key is: ${key}`,
      html: `
        <h2>Your New Password and Confirmation Key</h2>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Confirmation Key:</strong> ${key}</p>
      `,
    })
    res.json({ message: 'New password email sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to send new password email' })
  }
})

router.post('/send-task-notify', async (req, res) => {
  const { email, task } = req.body
  if (!email || !task)
    return res.status(400).json({ message: 'Email and task are required' })

  try {
    await sendMail({
      to: email,
      subject: 'New Task Assignment',
      text: `You have a new task: ${task}`,
      html: `<p>You have a new task: <strong>${task}</strong></p>`,
    })
    res.json({ message: 'Task notification sent' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to send task notification' })
  }
})

export default router
