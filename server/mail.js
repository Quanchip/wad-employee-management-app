import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'companyweb14@gmail.com',
    pass: 'eige noog hnux lgdf',
  },
})

export async function sendMail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: '"Your Company" <companyweb14@gmail.com>',
      to,
      subject,
      text,
      html,
    })
    console.log('MessageId:', info.messageId)
    console.log('SMTP response:', info.response)
    return info
  } catch (error) {
    console.error('Error sending mail:', error)
    throw error
  }
}
