import express from 'express';
import {
    createJob,
    viewAllJob,
    viewJob,
    updateJob,
    deleteJob
} from '../controllers/jobsController.js';

const router = express.Router();

// Route to create a job
router.post('/create', createJob);

// Route to view all jobs
router.get('/viewAll', viewAllJob);

// Route to view a specific job by ID
router.get('/view/:id', viewJob);

// Route to update a job by ID
router.put('/update/:id', updateJob);

// Route to delete a job by ID
router.delete('/delete/:id', deleteJob);

export default router;
