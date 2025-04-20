import express from 'express'; 
import authMiddleware from '../middleware/authMiddleware.js'; 
import { changePassowrd } from '../controllers/settingController.js';

const router = express.Router();


router.put('/change-password', authMiddleware, changePassowrd);



export default router;
