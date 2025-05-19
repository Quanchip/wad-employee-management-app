import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addTeam } from '../controllers/teamController.js'

const router = express.Router()

router.post('/add', authMiddleware, addTeam)

export default router
