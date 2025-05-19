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

export { addTeam }
