import express from 'express'; 
// import authMiddleware from '../middleware/authMiddleware.js'; 
// import { addSalary } from '../controllers/salaryControl.js'; // Ensure the correct import

const router = express.Router();

// POST route to add salary
// router.post('/add', authMiddleware, addSalary);

// GET route to test API
router.get('/add', (req, res) => {
    res.json({ success: true, message: "Salary Add API is working!" });
});

export default router;
