import express from "express";

import {
    createEvent,
    viewAllEvent,
    viewEvent,
    updateEvent,
    deleteEvent,
    userEvents,
    userEvent
} from "../controllers/eventsController.js"
import { verifyAdmin, verify } from "../middlewares/authMiddleware.js";

const router = express.Router();

//User routes
router.get('/getAll',verify, userEvents)
router.get('/get/:id',verify, userEvent)

//Admin routes
router.post('/add',verifyAdmin, createEvent)
router.get('/view',verifyAdmin, viewAllEvent)
router.get('/view/:id',verifyAdmin, viewEvent)
router.put('/update/:id',verifyAdmin, updateEvent)
router.delete('/delete/:id',verifyAdmin, deleteEvent)

export default router;