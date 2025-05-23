import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
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
} from '../controllers/taskController.js'

const router = express.Router()

router.get('/team/:id', authMiddleware, getTaskforTeam)
router.delete('/team/:id', authMiddleware, deleteTeamTask)

router.post('/add-team', authMiddleware, addTaskForTeam)
router.post('/add', authMiddleware, addTask)
router.put('/assign/team/:id', authMiddleware, assignTaskForTeam)
router.put('/assign/:id', authMiddleware, assignTask)
router.put('/emp/markDone/:id', authMiddleware, markDoneEmp)
router.put('/team/markDone/:id', authMiddleware, markDoneTeam)
router.put('/team/:id', authMiddleware, updateTaskForTeam)
router.get('/personalTask/:id', authMiddleware, getTaskPerson)
router.get('/teamTask/:id', authMiddleware, getTaskTeamPerson)
router.get('/:id/:role', authMiddleware, getTask)
router.get('/:id', authMiddleware, getTask)
router.get('/', authMiddleware, getTasks)

router.put('/:id', authMiddleware, updateTask)
router.delete('/:id', authMiddleware, deleteTask)

export default router
