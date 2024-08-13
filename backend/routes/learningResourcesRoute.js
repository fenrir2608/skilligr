import express from 'express';
import {
    createResource,
    viewAllResource,
    viewResource,
    deleteResource
} from '../controllers/learningResourcesController.js';

const router = express.Router();

// Route to create a resource
router.post('/create', createResource);

// Route to view all resources
router.get('/viewAll', viewAllResource);

// Route to view a specific resource by ID
router.get('/view/:id', viewResource);

// Route to delete a resource by ID
router.delete('/delete/:id', deleteResource);

export default router;
