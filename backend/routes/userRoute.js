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
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/reset", reset);
router.put("/update:token", update);

router.route("/user").get(viewUser).put(updateUser).delete(removeUser);

export default router;
