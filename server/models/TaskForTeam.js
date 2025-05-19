import mongoose from 'mongoose'
const { Schema } = mongoose
const taskForTeamSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deadlineAt: {type:Date, default:null},
  assignAt: {type:Date, default:null},
  returnAt: { type: Date, default: null },
  status: { type: String, default: 'no assign' },
  complete: { type: Boolean, default: false }
})

const TaskForTeam = mongoose.model('TaskForTeam', taskForTeamSchema)

export default TaskForTeam
