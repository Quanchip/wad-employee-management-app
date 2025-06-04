import express, { Router } from 'express'
import { login, verify } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'




const router = express.Router()

router.post('/login', login) // When come to this route it call login function from authController.js

router.get('/verify', authMiddleware, verify) // When come to this route it call login function from authController.js


export default router;