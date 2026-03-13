import mongoose from "mongoose";


const chatHistorySchema = new mongoose.Schema({
    title : {
        type : String, 
        required : [true , "title is required"]
    }, 
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "User"
    }
})


const chatHistoryModel = mongoose.model("chatHistoryModel", chatHistorySchema)

export default chatHistoryModel;