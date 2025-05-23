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
    const teams = await Team.find().populate({
      path: 'leaderId',
      populate: {
        path: 'userId',
        select: 'name',
      },
    })
    return res.status(200).json({ success: true, teams })
  } catch (error) {
    console.error('Error getTeams:', error.message)
    return res
      .status(500)
      .json({ success: false, error: 'Get team server error' })
  }
}

const addTeammate = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team)
      return res.status(404).json({ success: false, error: 'Team not found' })

    const newMembers = req.body.employeeIds.filter(
      (id) => !team.employeeIds.includes(id)
    )
    team.employeeIds.push(...newMembers)
    team.noOfMembers = team.employeeIds.length

    await team.save()
    res
      .status(200)
      .json({ success: true, message: 'Members added successfully' })
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params
    const deletedTeam = await Team.findByIdAndDelete(id)

    if (!deletedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' })
    }

    return res.status(200).json({ success: true, deletedTeam })
  } catch (error) {
    console.error('Error deleting team:', error)
    return res
      .status(500)
      .json({ success: false, error: 'Error deleting team' })
  }
}

const getTeam = async (req, res) => {
  try {
    const { id } = req.params
    const team = await Team.findById(id)
      .populate({
        path: 'leaderId',
        populate: { path: 'userId', select: 'name email' },
      })
      .populate({
        path: 'employeeIds',
        populate: { path: 'userId', select: 'name' },
      })

    if (!team)
      return res.status(404).json({ success: false, error: 'Team not found' })

    return res.status(200).json({ success: true, team })
  } catch (error) {
    console.error('Error fetching team:', error)
    return res.status(500).json({ success: false, error: 'Error fetching' })
  }
}

const editTeam = async (req, res) => {
  try {
    const { id } = req.params
    const { team_name, leaderId } = req.body
    console.log('Edit team request:', id, team_name, leaderId)

    const updatedTeam = await Team.findByIdAndUpdate(
      { _id: id },
      {
        team_name,
        leaderId,
      },
      { new: true }
    )

    if (!updatedTeam) {
      return res.status(404).json({ success: false, error: 'Team not found' })
    }
    return res.status(200).json({ success: true, updatedTeam })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error update' })
  }
}

const updateEmployees = async (req, res) => {
  try {
    const { id } = req.params
    const { employeeIds } = req.body

    const team = await Team.findById(id)
    if (!team) {
      return res.status(404).json({ success: false, error: 'Team not found' })
    }

    team.employeeIds = employeeIds
    team.noOfMembers = employeeIds.length
    await team.save()

    res.status(200).json({ success: true, message: 'Team members updated.' })
  } catch (err) {
    console.error('Error updating employees:', err)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

const checkLeader = async (req, res) => {
  try {
    const userId = req.params.id

    const employeeId = await Employee.findOne({ userId: userId })
    const team = await Team.findOne({leaderId: employeeId})
    if (team) {
      return res.json({ success: true, isLeader: true })
    } else {
      return res.json({ success: true, isLeader: false })
    }
  } catch (error) {
    console.error('Error checking leader status:', error)
    return res.status(500).json({ success: false, error: 'Server error' })
  }
}

export {
  addTeam,
  getTeams,
  addTeammate,
  deleteTeam,
  getTeam,
  editTeam,
  updateEmployees,
  checkLeader,
}
