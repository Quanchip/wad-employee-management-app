import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  addTeam,
  addTeammate,
  getTeams,
  deleteTeam,
  getTeam,
  editTeam,
  updateEmployees,
} from '../controllers/teamController.js'

const router = express.Router()

router.get('/', authMiddleware, getTeams)
router.post('/add', authMiddleware, addTeam)
router.put('/addTeammate/:id', authMiddleware, addTeammate)
router.put('/updateEmployees/:id', authMiddleware, updateEmployees)
router.put('/:id', authMiddleware, editTeam)
router.get('/:id', authMiddleware, getTeam)
router.delete('/:id', authMiddleware, deleteTeam)

export default router
