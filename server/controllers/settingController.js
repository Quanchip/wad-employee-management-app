import User from '../models/User.js'
import bcrypt from 'bcrypt'
const changePassowrd = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword, confirmKey } = req.body

    const user = await User.findById({ _id: userId })
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    const keyIsMatch = await bcrypt.compare(confirmKey, user.key)
    if (!isMatch && !keyIsMatch) {
      return res
        .status(404)
        .json({ success: false, error: 'wrong old password and key' })
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    const newUser = await User.findByIdAndUpdate(
      { _id: userId },
      { password: hashPassword }
    )
    console.log("Success")
    return res.status(200).json({ success: true, newUser })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Setting get Error' })
  }
}

export { changePassowrd }
