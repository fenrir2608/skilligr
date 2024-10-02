import express from "express";

import {
    viewDashboard,
    userDashboard
} from "../controllers/dashboardController.js"
import { verify } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/admin',verify, viewDashboard)
router.get('/user',verify, userDashboard)

export default router;