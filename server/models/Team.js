import mongoose from 'mongoose'
const { Schema } = mongoose
const teamSchema = new mongoose.Schema({
  team_name: { type: String, required: true },
  leaderId: { type: Schema.Types.ObjectId, ref: 'Employee', required: null },
  employeeIds: [
    { type: Schema.Types.ObjectId, ref: 'Employee', default: null },
  ],
  noOfMembers: { type: Number, default: 0 },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'TaskForTeam', default: [] }],
  key: { type: String, require: null },
})

const Team = mongoose.model('Team', teamSchema)

export default Team
