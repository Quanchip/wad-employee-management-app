import Task from '../models/Task.js'
import Employee from '../models/Employee.js'
import TaskForTeam from '../models/TaskForTeam.js'
import Team from '../models/Team.js'
const addTask = async (req, res) => {
  try {
    const { task_name, description } = req.body
    const newTask = new Task({
      task_name,
      description,
    })
    await newTask.save()
    return res.status(200).json({ success: true, task: newTask })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: ' add task server error' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const deletetask = await Task.findById({ _id: id })
    await Task.deleteOne()
    return res.status(200).json({ success: true, deletetask })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error delete' })
  }
}

const getTasks = async (req, res) => {
  try {
    const personalTasks = await Task.find().populate({
      path: 'employeeId',
      populate: { path: 'userId', select: 'name' },
    })

    const teamTasks = await TaskForTeam.find()

    const combined = [
      ...personalTasks.map((task) => ({
        ...task.toObject(),
        task_for: 'personal',
      })),
      ...teamTasks.map((task) => ({
        ...task.toObject(),
        task_for: 'team',
      })),
    ]

    return res.status(200).json({ success: true, tasks: combined })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching tasks' })
  }
}

const getTask = async (req, res) => {
  try {
    const { id, role } = req.params
    let task
    if (role === 'employee') {
      const employee = await Employee.findOne({ userId: id })
      task = await Task.find({ employeeId: employee._id })
    } else {
      task = await Task.findById({ _id: id }).populate({
        path: 'employeeId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      })
    }

    return res.status(200).json({ success: true, task })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching data task' })
  }
}

const getTaskPerson = async (req, res) => {
  try {
    const { id } = req.params
    let task
    const employee = await Employee.findOne({ userId: id })
    task = await Task.find({ employeeId: employee._id })
    return res.status(200).json({ success: true, task })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching data task' })
  }
}

const getTaskTeamPerson = async (req, res) => {
  try {
    const { id } = req.params

    const employee = await Employee.findOne({ userId: id })
    const team = await Team.findOne({
      $or: [{ leaderId: employee._id }, { employeeIds: employee._id }],
    })
    if (!team) {
      return res
        .status(404)
        .json({ success: false, error: 'Team not found for this employee' })
    }

    const task = await TaskForTeam.find({ teamId: team._id })
    return res.status(200).json({ success: true, task })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching team tasks' })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { task_name, description, deadlineAt } = req.body
    const udpateTask = await Task.findByIdAndUpdate(
      { _id: id },
      {
        task_name,
        description,
        deadlineAt,
      }
    )
    return res.status(200).json({ success: true, udpateTask })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error update' })
  }
}

const updateTaskForTeam = async (req, res) => {
  try {
    const { id } = req.params
    const { task_name, description, deadlineAt } = req.body
    const updateTask = await TaskForTeam.findByIdAndUpdate(
      { _id: id },
      {
        task_name,
        description,
        deadlineAt,
      },
      { new: true }
    )
    return res.status(200).json({ success: true, updateTask })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error update' })
  }
}

const assignTask = async (req, res) => {
  try {
    const { id } = req.params
    const { employeeId, assignAt, deadlineAt } = req.body
    if (!employeeId || !assignAt || !deadlineAt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: employeeId, assignAt, deadlineAt',
      })
    }
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        employeeId,
        assignAt,
        deadlineAt,
        status: 'Assigned',
        updatedAt: new Date(),
      },
      { new: true }
    )
    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }
    return res.json({ success: true, task: updatedTask })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Server error during task assignment' })
  }
}

const markDoneEmp = async (req, res) => {
  try {
    console.log('✅ markDone controller called')
    const { id } = req.params
    const markdone = await Task.findByIdAndUpdate(
      id,
      { complete: true, returnAt: new Date() },

      { new: true }
    )
    if (!markdone) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }

    return res.json({ success: true, task: markdone })
  } catch (error) {
    console.error('Error in markDone:', error)
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' })
  }
}

const markDoneTeam = async (req, res) => {
  try {
    console.log('✅ markDone controller called')
    const { id } = req.params
    const markdone = await TaskForTeam.findByIdAndUpdate(
      id,
      { complete: true, returnAt: new Date() },

      { new: true }
    )
    if (!markdone) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }

    return res.json({ success: true, task: markdone })
  } catch (error) {
    console.error('Error in markDone:', error)
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' })
  }
}

const addTaskForTeam = async (req, res) => {
  try {
    const newTask = new TaskForTeam(req.body)
    await newTask.save()
    res.json({ success: true, task: newTask })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

const deleteTeamTask = async (req, res) => {
  try {
    const { id } = req.params
    const deletedTask = await TaskForTeam.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }
    return res.status(200).json({ success: true, task: deletedTask })
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Delete error' })
  }
}
const getTaskforTeam = async (req, res) => {
  try {
    const { id } = req.params

    const task = await TaskForTeam.findById(id).populate({
      path: 'teamId',
      select: 'team_name leaderId',
      populate: {
        path: 'leaderId',
        select: 'userId',
        populate: {
          path: 'userId',
          select: 'name',
        },
      },
    })

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }
    return res.status(200).json({ success: true, task })
  } catch (error) {
    console.error('❌ getTaskforTeam error:', error)
    console.error(error.stack) // thêm dòng này
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching team task' })
  }
}

const assignTaskForTeam = async (req, res) => {
  try {
    const { id } = req.params
    console.log('Task ID from URL:', id)

    const { teamId, assignAt, deadlineAt } = req.body
    if (!teamId || !assignAt || !deadlineAt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: teamId, assignAt, deadlineAt',
      })
    }
    const updatedTaskForTeam = await TaskForTeam.findByIdAndUpdate(
      id,
      {
        teamId,
        assignAt,
        deadlineAt,
        status: 'Assigned',
        updatedAt: new Date(),
      },
      { new: true }
    )
    if (!updatedTaskForTeam) {
      return res.status(404).json({ success: false, error: 'Task not found' })
    }
    return res.json({ success: true, task: updatedTaskForTeam })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Server error during task assignment' })
  }
}

export {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
  getTask,
  assignTask,
  markDoneEmp,
  markDoneTeam,
  addTaskForTeam,
  deleteTeamTask,
  getTaskforTeam,
  assignTaskForTeam,
  updateTaskForTeam,
  getTaskPerson,
  getTaskTeamPerson,
}
