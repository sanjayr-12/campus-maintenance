import express from "express";
import {
  signup,
  login,
  addWorkers,
  getAll,
  deleteStaff,
  staffRegister,
  getAllStaff
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/ProtectAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/addWorkers", protectRoute, addWorkers);
router.get("/all", protectRoute, getAll);
router.delete("/delete/:id", protectRoute, deleteStaff);
router.post("/staffSignup", protectRoute, staffRegister);
router.get("/getAllstaff",protectRoute, getAllStaff)

export default router;
