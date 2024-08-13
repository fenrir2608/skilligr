import express from "express";

import {
    viewDashboard
} from "../controllers/dashboardController.js"

const router = express.Router();

// router.post('/add',createEvent)
router.get('/view',viewDashboard)

export default router;