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
export { addTask, deleteTask, getTasks }
