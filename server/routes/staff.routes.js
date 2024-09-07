//register for staff
import express from "express"
import { signup, login, getAll, logout, updateWorkers } from "../controllers/staff.controller.js"
import { protectRoute } from "../middleware/adminVerify.js"
import { protectStaffRoute } from "../middleware/staffVerify.js"

const router = express.Router()

router.post("/staffUp",protectRoute, signup)
// router.post("/addWorkers",protectRoute, addWorkers)
router.post("/login", login)
router.get("/getAll",protectStaffRoute, getAll)
router.post("/logout",protectStaffRoute, logout)
router.patch("/update",protectStaffRoute, updateWorkers)

export default router
