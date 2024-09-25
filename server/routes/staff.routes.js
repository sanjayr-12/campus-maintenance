//register for staff
import express from "express";
import {
  login,
  getAll,
    updateWorkers,
  deleteWorkers,

} from "../controllers/staff.controller.js";

import { protectRoute } from "../middleware/ProtectAuth.js";


const router = express.Router();

router.post("/login", login);
router.get("/getAll", protectRoute, getAll);
router.patch("/update", protectRoute, updateWorkers);
router.post("/delete/:id", protectRoute, deleteWorkers);


export default router;
