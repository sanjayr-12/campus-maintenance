import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected successfully");
        
    } catch (error) {
        console.log(error.message);
    }
    
}

export default connectDB