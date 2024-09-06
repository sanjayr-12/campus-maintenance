import express from "express";
import {
  signup,
  login,
  logout,
    addWorkers,
  getAll
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/adminVerify.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addWorkers", protectRoute, addWorkers);
router.get("/all", protectRoute, getAll);

export default router;
