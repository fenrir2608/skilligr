import express from "express";
import {
  login,
  signup,
  logout,
  reset,
  update,
  viewUser,
  updateUser,
  removeUser,
  activateUser,
  verifyCookie,
} from "../controllers/userController.js";
import { verifyAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Public Routes
router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/reset", reset);
router.put("/reset", update);
router.post("/verifyCookie",verifyCookie);

//Protected Routes
router.put("/admin/activate", activateUser);
router
  .route("/admin")
  .get(verifyAdmin, viewUser)
  .put(verifyAdmin, updateUser)
  .delete(verifyAdmin, removeUser);

export default router;
