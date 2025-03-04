import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected: " + conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error instanceof Error ? error.message : error);
        throw error; 
    }
};
