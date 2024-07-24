import dotenv from 'dotenv';
import mongoose, {Schema} from "mongoose";
const DB_Name = 'ChatData';

//Database is always in another continent: use async wait
//Use try: catch: to handle any kind of error
dotenv.config({path : './.env'})


const chatSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        index: true //In mongoDB, to make any field searchabel in optimized way we keep it true.
    },
    user_query: {
        type:String,
        required: true,
        
    },
    bot_response: {
        type:String,
        required: true,
    }
},{timestamps: true})


const Chat = mongoose.model("Chats",chatSchema)

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}${DB_Name}`)
        console.log(`Mongo DB connected!` )
    }
    catch(error){
        console.log("Mongo DB connection FAILED ", error)
        process.exit(1)
    }
}

export {Chat, connectDB}