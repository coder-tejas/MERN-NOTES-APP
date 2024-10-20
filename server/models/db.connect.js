import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url).then(
    ()=>{
        console.log("MONGOO!!")
    }
).catch((error)=>{console.log("mongo error: ",error)})