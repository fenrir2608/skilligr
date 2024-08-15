import express from 'express';
import {
    createNotification,
    viewAllNotification,
    viewNotification,
    updateNotification,
    deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

// Route to create a notification
router.post('/create', createNotification);

// Route to view all notifications
router.get('/viewAll', viewAllNotification);

// Route to view a specific notification by ID
router.get('/view/:id', viewNotification);

// Route to update a notification by ID
router.put('/update/:id', updateNotification);

// Route to delete a notification by ID
router.delete('/delete/:id', deleteNotification);

export default router;
