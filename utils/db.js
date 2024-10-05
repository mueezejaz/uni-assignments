import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const db_connect = async () => {
    const uri = `mongodb+srv://user2:${process.env.DBP}@cluster0.kpwiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(uri);  // Simplified connection
        console.log("db is connected");
    } catch (error) {
        console.log(error);
        setTimeout(db_connect, 5000);
    }
};
