import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addTeam, addTeammate, getTeams,deleteTeam,getTeam,editTeam } from '../controllers/teamController.js'


const router = express.Router()

router.get('/', authMiddleware, getTeams)
router.get('/:id', authMiddleware, getTeam)
router.put('/addTeammate/:id', authMiddleware, addTeammate)
router.post('/add', authMiddleware, addTeam)
router.put('/:id', authMiddleware, editTeam)
router.delete('/:id', authMiddleware, deleteTeam)

export default router
