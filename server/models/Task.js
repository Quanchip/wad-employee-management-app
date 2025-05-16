import mongoose from 'mongoose'
const { Schema } = mongoose
const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deadlineAt: {type:Date, default:null},
  assignAt: {type:Date, default:null},
  returnAt: { type: Date, default: null },
  status: { type: String, default: 'no assign' },
  complete: {type:String, default: 'No completed'},
})

const Task = mongoose.model('Task', taskSchema)

export default Task
