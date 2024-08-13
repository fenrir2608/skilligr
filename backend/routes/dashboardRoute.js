import express from "express";

import {
    viewDashboard
} from "../controllers/dashboardController.js"

const router = express.Router();

router.get('/',viewDashboard)

export default router;