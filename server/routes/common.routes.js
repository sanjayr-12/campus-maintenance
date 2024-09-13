import express from "express"
import { protectRoute } from "../middleware/ProtectAuth.js"
import { verifyMe } from "../middleware/verify.js"

const router = express.Router()


router.get("/verify", protectRoute, verifyMe)


export default router
