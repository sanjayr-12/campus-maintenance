//register for staff
import express from "express";
import {
  signup,
  login,
  getAll,
  logout,
    updateWorkers,
  deleteWorkers,

} from "../controllers/staff.controller.js";

import { protectRoute } from "../middleware/ProtectAuth.js";
import { verifyMe } from "../middleware/verify.js";

const router = express.Router();

router.post("/staffUp", protectRoute, signup);
router.post("/login", login);
router.get("/getAll", protectRoute, getAll);
router.post("/logout", protectRoute, logout);
router.patch("/update", protectRoute, updateWorkers);
router.delete("/delete/:id", protectRoute, deleteWorkers);
// router.get("/verify", protectRoute, verifyMe);

export default router;
