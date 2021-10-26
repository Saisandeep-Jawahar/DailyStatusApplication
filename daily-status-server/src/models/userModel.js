import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  employeeID: { type: Number, unique: true, required: true },
  employeeName: { type: String, required: true },
  team: { type: String, required: true },
  password: { type: String, required: true },
  emailId: { type: String, required: true },
  project: { type: String, required: true },
  hasAdminRights: { type: Boolean, default: false },
})

const User = mongoose.model('User', userSchema, 'User')

export default User
