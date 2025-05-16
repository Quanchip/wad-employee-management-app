import Task from '../models/Task.js'
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
    const tasks = await Task.find().populate({
      path: 'employeeId',
      populate: {
        path: 'userId',
        select: 'name',
      },
    })

    return res.status(200).json({ success: true, tasks })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching tasks' })
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById({ _id: id })
    return res.status(200).json({ success: true, task })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: 'Error fetching data task' })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { task_name, description } = req.body
    const udpateTask = await Task.findByIdAndUpdate(
      { _id: id },
      {
        task_name,
        description,
      }
    )
    return res.status(200).json({ success: true, udpateTask })
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
export { addTask, deleteTask, getTasks, updateTask, getTask, assignTask }
