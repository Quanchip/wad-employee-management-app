import express, { Router } from 'express'
import { login } from '../controllers/authController.js'


const router = express.Router()

router.post('/login', login) // When come to this route it call login function from authController.js

export default router;