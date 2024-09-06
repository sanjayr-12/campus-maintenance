import express from "express"
import { signup, login, logout, addWorkers } from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout", logout)
router.post("/addWorkers", addWorkers)


export default router