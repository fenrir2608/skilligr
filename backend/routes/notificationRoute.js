import express from 'express';
import {
    createNotification,
    viewAllNotification,
    viewNotification,
    updateNotification,
    deleteNotification,
    getNotificationsUser,
    getNotificationUser
} from '../controllers/notificationController.js';

import { verifyAdmin, verify } from "../middlewares/authMiddleware.js";

const router = express.Router();

//User Routes
router.get('/getNotifications',verify, getNotificationsUser);
router.get('/getNotification/:id',verify, getNotificationUser);
// Admin Routes
router.post('/create',verifyAdmin, createNotification);
router.get('/viewAll',verifyAdmin, viewAllNotification);
router.get('/view/:id',verifyAdmin, viewNotification);
router.put('/update/:id',verifyAdmin, updateNotification);
router.delete('/delete/:id',verifyAdmin, deleteNotification);

export default router;
