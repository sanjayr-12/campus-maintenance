import jwt from "jsonwebtoken"
import Admin from "../model/admin.schema.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({error:"Unauthorized"})
        }
        const admin = await Admin.findById(verify.id).select("-password")
        if (!admin) {
            return res.status(401).json({error:"You are not logged"})
        }
        // console.log(admin);
        if (!admin.isAdmin) {
            return res.status(400).json({error:"you are not authorized"})
        }

        req.admin = admin

        next()
    } catch (error) {
        return res.status(500).json({error:"Internal server error "+error.message})
    }
}