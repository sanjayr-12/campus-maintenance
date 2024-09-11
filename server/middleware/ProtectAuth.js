import jwt from "jsonwebtoken"
import Admin from "../model/admin.schema.js"
import EId from "../model/staff.id.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({error:"No Auth Token"})
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({error:"Unauthorized verification fails"})
        }


        const admin = await Admin.findById(verify.id).select("-password")
        
        const staff = await EId.findById(verify.id).select("-password")

        if (!admin && !staff) {
            return res.status(401).json({error:"You are not logged"})
        }

        if (admin) {
            req.admin = admin
            next()
        }

        if (staff) {
            req.user = staff
            next()
        }

    } catch (error) {
        res.status(500).json({error:"Internal server error "+error.message})
    }
}