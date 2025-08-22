import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URI  ?? "mongodb://localhost:27017/rbac")
        console.log(" MongoDB Connected",process.env.DB_URI);
    } catch (error) {
        console.log(" MongoDB Not Connected",error);
        process.exit(1);
    }
}

export default connectDB;