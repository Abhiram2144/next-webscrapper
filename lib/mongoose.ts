import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) return;

    if(!process.env.MONGODB_URI) return console.log("MongoDb uri is not defined properly!! Please check");

    try{
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to MongoDB");
    }
    catch(err)
    {
        console.log("Error connecting to MongoDB: ", err);
        throw new Error("Error connecting to MongoDB");
    }


  
};