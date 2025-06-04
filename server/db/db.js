import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL is not defined in environment variables');
        }
        
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit the process if database connection fails
    } 
}

export default connectToDatabase;