import express from 'express';
import {
    createNotification,
    viewAllNotification,
    viewNotification,
    updateNotification,
    deleteNotification,
    getNotificationUser
} from '../controllers/notificationController.js';

import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//User Routes
router.get('/getNotification', getNotificationUser);
// Admin Routes
router.use(verifyAdmin);
router.post('/create', createNotification);
router.get('/viewAll', viewAllNotification);
router.get('/view/:id', viewNotification);
router.put('/update/:id', updateNotification);
router.delete('/delete/:id', deleteNotification);



export default router;
