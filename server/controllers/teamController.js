import Employee from '../models/Employee.js'
import Team from '../models/Team.js'
const addTeam = async (req, res) => {
  try {
    const { team_name, leaderId } = req.body
    const newTeam = new Team({
      team_name,
      leaderId,
    })
    await newTeam.save()
    return res.status(200).json({ success: true, task: newTeam })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: ' add team server error' })
  }
}

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate({
        path: 'leaderId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      })
    return res.status(200).json({ success: true, teams })
  } catch (error) {
    console.error('Lỗi getTeams:', error.message)
    return res
      .status(500)
      .json({ success: false, error: 'Get team server error' })
  }
}

const addTeammate = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) return res.status(404).json({ success: false, error: 'Team not found' })

    const newMembers = req.body.employeeIds.filter(
      (id) => !team.employeeIds.includes(id)
    )
    team.employeeIds.push(...newMembers)
    team.noOfMembers = team.employeeIds.length

    await team.save()
    res.status(200).json({ success: true, message: 'Members added successfully' })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}


export { addTeam, getTeams, addTeammate }
