import express from 'express';
const router = express.Router();
import { markAttendance, getAttendanceReport } from '../controllers/attendanceController';

router.post('/', markAttendance);
router.get('/report', getAttendanceReport);

export default router;