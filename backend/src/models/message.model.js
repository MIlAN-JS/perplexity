import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "user",
        required : true
    },
    chat : {
         type : mongoose.Schema.Types.ObjectId, 
        ref : "chat", 
        required: true
    }, 
    role :  {
        type : String, 
        enum : ["human", "ai"], 
        required : true
        
    }, 
    message : {
        type : String , 
        required : true
    }
}, {timestamps : true})


const messageModel = mongoose.model("message", messageSchema)


export default messageModel