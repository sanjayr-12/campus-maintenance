import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const staffId = new mongoose.Schema({
    name: {
        type:String
    },
    password: {
        type: String,
        required:true
    },
    uuid: {
        type: String,
    },
    slug: {
        type: String,
    }
    
})

//eid means essential id
const EId = mongoose.model("StaffId", staffId)

export default EId