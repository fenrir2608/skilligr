import express from 'express';
import {
    createResource,
    viewAllResource,
    viewResource,
    deleteResource,
    userResources,
    userResource
} from '../controllers/learningResourcesController.js';
import { verifyAdmin, verify } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Routes
router.get('/getAll',verify, userResources);
router.get('/get/:id',verify, userResource);

// Admin Routes
router.post('/create',verifyAdmin, createResource);
router.get('/viewAll',verifyAdmin, viewAllResource);
router.get('/view/:id',verifyAdmin, viewResource);
router.delete('/delete/:id',verifyAdmin, deleteResource);

export default router;
