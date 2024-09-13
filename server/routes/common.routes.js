import express from "express"
import { protectRoute } from "../middleware/ProtectAuth.js"
import { verifyMe } from "../middleware/verify.js"
import { logout } from "../middleware/logout.js"

const router = express.Router()


router.get("/verify", protectRoute, verifyMe)
router.post("/logout", protectRoute, logout)


export default router
