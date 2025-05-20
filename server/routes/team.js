import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addTeam, addTeammate, getTeams,deleteTeam } from '../controllers/teamController.js'

const router = express.Router()

router.get('/', authMiddleware, getTeams)
router.put('/addTeammate/:id', authMiddleware, addTeammate)
router.post('/add', authMiddleware, addTeam)
router.delete('/:id', authMiddleware, deleteTeam)
export default router
