import express from "express";

import {
    createEvent,
    viewAllEvent,
    viewEvent,
    updateEvent,
    deleteEvent
} from "../controllers/eventsController.js"

const router = express.Router();

router.post('/add',createEvent)
router.get('/view',viewAllEvent)
router.get('/view/:id',viewEvent)
router.put('/update/:id',updateEvent)
router.delete('/delete/:id',deleteEvent)

export default router;