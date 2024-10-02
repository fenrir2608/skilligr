import express from 'express';
import {
    createResource,
    viewAllResource,
    viewResource,
    deleteResource,
    userResources,
    userResource
} from '../controllers/learningResourcesController.js';

const router = express.Router();

// User Routes
router.get('/getAll', userResources);
router.get('/get/:id', userResource);

// Admin Routes
router.post('/create', createResource);
router.get('/viewAll', viewAllResource);
router.get('/view/:id', viewResource);
router.delete('/delete/:id', deleteResource);

export default router;
