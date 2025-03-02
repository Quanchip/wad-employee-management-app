import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'

/**Create ADMIN user */
const userRegister = async () => {
  connectToDatabase()
  try {
    const hashPassword = await bcrypt.hash('admin', 10)
    const newUser = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashPassword,
      role: 'admin',
    })
    await newUser.save()
    console.log(" MONGO_URI:", process.env.MONGODB_URL);
  } catch (error) {
    console.log(error)
  }
}

userRegister()
