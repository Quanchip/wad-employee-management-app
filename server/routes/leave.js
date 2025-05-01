import express from 'express'; 
import authMiddleware from '../middleware/authMiddleware.js'; 
import { addLeave,getLeave, getLeaves, getLeaveDetail, updateLeaveStatus } from '../controllers/leaveController.js';


const router = express.Router();


router.post('/add', authMiddleware, addLeave);
router.get('/detail/:id', authMiddleware, getLeaveDetail);
router.get('/:id/:role', authMiddleware, getLeave);
router.get('/', authMiddleware, getLeaves);
router.put('/:id', authMiddleware, updateLeaveStatus);

export default router;
