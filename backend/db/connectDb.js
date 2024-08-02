import mongoose from "mongoose";
import dotenv from 'dotenv'

const connectMongoDB = async () => {
    try {
        if (!process.env.MONGO_DB_URI) {
            throw new Error('MONGO_URI is not set');
        }

        const connect = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectMongoDB