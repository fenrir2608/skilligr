import express from "express";
import {
    viewFeedback,
    viewAllFeedback,
    insertFeedback,
} from "../controllers/feedbackController.js";
import { verifyAdmin, verify } from "../middlewares/authMiddleware.js";

const router = express.Router();
//User
router.post("/add",verify, insertFeedback);
//Admin
router.get("/view/:id",verifyAdmin, viewFeedback);
router.get("/viewAll",verifyAdmin, viewAllFeedback);

export default router;
