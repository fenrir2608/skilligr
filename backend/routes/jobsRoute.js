import express from 'express';
import {
    createJob,
    viewAllJob,
    viewJob,
    updateJob,
    deleteJob,
    userJob,
    userJobs
} from '../controllers/jobsController.js';
import { verify, verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//User Routes
router.get('/getAll', verify, userJobs);
router.get('/get/:id', verify, userJob);

//Admin Routes
router.post('/create',verifyAdmin, createJob);
router.get('/viewAll',verifyAdmin, viewAllJob);
router.get('/view/:id',verifyAdmin, viewJob);
router.put('/update/:id',verifyAdmin, updateJob);
router.delete('/delete/:id',verifyAdmin, deleteJob);

export default router;
