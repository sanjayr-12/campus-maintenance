//register for staff
import express from "express"
import { signup } from "../controllers/staff.controller.js"
import { protectRoute } from "../middleware/adminVerify.js"

const router = express.Router()

router.post("/staffUp",protectRoute, signup)
// router.post("/addWorkers",protectRoute, addWorkers)

export default router
