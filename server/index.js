import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/campus.db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/admin.routes.js"
import staffRoutes from "./routes/staff.routes.js"
const app = express()
dotenv.config()
app.use(express.json())
const PORT  = process.env.PORT
app.use(cookieParser())

app.use("/api/admin",authRoutes)
app.use("/api/staff",staffRoutes)


app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
     connectDB();
})