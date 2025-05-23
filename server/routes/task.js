import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
  getTask,
  assignTask,
  markDone,
  addTaskForTeam,
  deleteTeamTask,
  getTaskforTeam,
  assignTaskForTeam,
  updateTaskForTeam,
} from '../controllers/taskController.js'

const router = express.Router()

router.get('/team/:id', authMiddleware, getTaskforTeam)
router.delete('/team/:id', authMiddleware, deleteTeamTask)

router.post('/add-team', authMiddleware, addTaskForTeam)
router.post('/add', authMiddleware, addTask)
router.put('/assign/team/:id', authMiddleware, assignTaskForTeam)
router.put('/assign/:id', authMiddleware, assignTask)
router.put('/emp/markDone/:id', authMiddleware, markDone)
router.put('/team/:id', authMiddleware, updateTaskForTeam)

router.get('/:id/:role', authMiddleware, getTask)
router.get('/:id', authMiddleware, getTask)

router.get('/', authMiddleware, getTasks)

router.put('/:id', authMiddleware, updateTask)
router.delete('/:id', authMiddleware, deleteTask)

export default router
