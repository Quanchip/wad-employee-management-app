import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js'


const router = express.Router()

//Read
router.get('/', authMiddleware, getEmployees)
//Create
router.post('/add', authMiddleware, upload.single('image'), addEmployee) 
// GET /api/salary/add (dummy response for testing)
router.get('/add', (req, res) => {
    res.json({ success: true, message: "Salary Add API is working!" });
});

router.get('/:id', authMiddleware, getEmployee)
//edit
router.put('/:id', authMiddleware, updateEmployee) 

router.get('/department/:id', authMiddleware, fetchEmployeesByDepId); 



export default router