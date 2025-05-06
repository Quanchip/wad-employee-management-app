import express from 'express' ;
import { getAttendance } from '../controllers/attendanceController.js';  
import verifyUser from '../middleware/authMiddleware.js'
import defaultAttendance from '../middleware/defaultAttendance.js'

const router = express.Router();  

router.get('/', verifyUser, defaultAttendance, getAttendance)

export default router; 
