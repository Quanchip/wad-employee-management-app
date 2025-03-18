import express from 'express'; 
import authMiddleware from '../middleware/authMiddleware.js'; 
import { addSalary } from '../controllers/salaryController.js'; // Corrected import
import { getSalary } from '../controllers/salaryController.js'; // Corrected import

const router = express.Router();

// POST route to add salary
router.post('/add', authMiddleware, addSalary);

// GET route to test API
router.get('/add', (req, res) => {
    res.json({ success: true, message: "Salary Add API is working!" });
}); 

// GET route to fetch salary details by ID
router.get('/:id', authMiddleware, getSalary);

export default router;
