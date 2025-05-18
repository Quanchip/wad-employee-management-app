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

transporter.verify((err, success) => {
  if (err) {
    console.error('Kết nối SMTP thất bại:', err)
  } else {
    console.log('SMTP server sẵn sàng gửi mail')
  }
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
