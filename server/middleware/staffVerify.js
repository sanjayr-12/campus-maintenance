import jwt from "jsonwebtoken"
import EId from "../model/staff.id.js"

export const protectStaffRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({message:"Not authorized"})
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({error:"You are not authorized"})
        }

        const staff = await EId.findById(verify.id).select("-password")

        req.user = staff
        next()
        
    } catch (error) {
        res.status(500).json({error:"Internale server error "+error.message})
    }
}