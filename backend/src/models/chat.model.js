import mongoose, { mongo } from "mongoose";


const chatSchema =new mongoose.Schema({
      chatHistory : { // in which chatHistory do one chat belong
        type : mongoose.Schema.Types.ObjectId,
        ref : "ChatHistory"
      }, 

      content : {
        type : String , 
        required : [true , "content is required"]
      }, 

      role : {
        type : String, 
        enum : ["user", "ai"]
      }

},{timestamps : true})



const chatModel  = mongoose.model("chatModel", chatSchema)