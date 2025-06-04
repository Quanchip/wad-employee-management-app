import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js'
import multer from 'multer'

const router = express.Router()

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'File size too large. Maximum size is 5MB'
            });
        }
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    next(err);
};

//Read
router.get('/', authMiddleware, getEmployees)

//Create
router.post('/add', 
    authMiddleware,
    (req, res, next) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err.message
                });
            }
            next();
        });
    },
    addEmployee
)

// GET /api/salary/add (dummy response for testing)
router.get('/add', (req, res) => {
    res.json({ success: true, message: "Salary Add API is working!" });
});

router.get('/:id', authMiddleware, getEmployee)

//edit
router.put('/:id', authMiddleware, updateEmployee)

router.get('/department/:id', authMiddleware, fetchEmployeesByDepId); 

export default router