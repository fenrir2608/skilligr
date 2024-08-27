import express from "express";
import {
    viewFeedback,
    viewAllFeedback,
    insertFeedback,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/add", insertFeedback);
router.get("/view/:id", viewFeedback);
router.get("/viewAll", viewAllFeedback);


export default router;
