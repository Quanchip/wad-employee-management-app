import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addTask, deleteTask,getTasks } from '../controllers/taskController.js'

const router = express.Router()
router.get('/', authMiddleware, getTasks)
router.post('/add', authMiddleware, addTask)
router.delete('/:id', authMiddleware, deleteTask)


export default router