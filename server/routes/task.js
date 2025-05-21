import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addTask, deleteTask,getTasks, updateTask, getTask, assignTask, markDone,addTaskForTeam} from '../controllers/taskController.js'

const router = express.Router()


router.get('/:id/:role', authMiddleware, getTask)
router.get('/:id', authMiddleware, getTask)
router.get('/', authMiddleware, getTasks)
router.post('/add', authMiddleware, addTask)
router.post('/add-team', authMiddleware, addTaskForTeam)
router.delete('/:id', authMiddleware, deleteTask)

router.put('/:id', authMiddleware, updateTask)

router.put('/assign/:id', authMiddleware, assignTask)
router.put('/emp/markDone/:id', authMiddleware, markDone)

export default router