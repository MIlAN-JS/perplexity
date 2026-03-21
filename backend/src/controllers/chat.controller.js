import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { GenerateChatTitle, chatWithAi } from "../services/langchain.service.js";
import mongoose from "mongoose";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";

const sendMessageController = async(req, res , next)=>{

    try {
        
        // fetch data

        const humanMessage  =  req.body?.humanMessage
        const userId = req.userId
        const chatId = req.body?.chatId
        console.log(chatId)
        


           let chat = null ;
        
            if(!chatId ){      
                console.log("i runned")
        //Generate a title 
            const title = await GenerateChatTitle(humanMessage);
            console.log(title) 
        // create a new chat
          chat = await chatModel.create({user : userId , title : title })

            }else{

                
            if(!mongoose.Types.ObjectId.isValid(chatId)){
                return res.status(400).json({
                    message : "wrong objectId fkk u ", 
                    success : false
                })
            }
             chat = await chatModel.findById(chatId)

            if(!chat){

                return res.status(400).json({
                    message : "chat doesnt exist with this chatId", 
                    success : false, 
                })

            }

            console.log(chat)

            }

            //check if chat really exists 


         //store message 

         const message = await messageModel.create({chat :   chatId || chat._id , role : "human" , user : userId , message : humanMessage })

        // // fetch all the messages of the chat 

         const chatMessages = await messageModel.find({chat : chatId || chat._id})
            
         const formattedChatMessage = chatMessages.map((msg)=>{
            if(message.role == "human"){
                return new HumanMessage(msg.message)
            } 
            if(message.role == "ai"){
                return new AIMessage(msg.message)
            }
         })

         

        // // send message to ai 

        const aiResponse =  await chatWithAi(formattedChatMessage);


        // store ai response 

         const aiMessage = await messageModel.create({
            role : "ai", 
            message : aiResponse, 
            chat : chatId || chat._id,
            user : userId
         })

         chatMessages.push(aiMessage);

         

        



        res.status(201).json({
            message : "message sent successfully", 
            response : {
               chat : chat , 
               messages :  chatMessages
            }
        })



        // get response and store response 

    
        

    } catch (error) {
    
        console.log("cannot send message" , error)
        res.status(400).json({
            message : "cannot chat with ai", 
            error
        })
        
    }

} 



const getChatController = async(req , res , next)=>{
    try {

        // user id 
  const userId = req.userId
        // chat id 


        const chats = await chatModel.find()
       
        if(!chats){
            return res.status(404).json({
                message : "chat not found", 
                success : false
            })
        }


    res.status(201).json({
        message : "chats found", 
        success : true, 
        chats 

    })
 
    } catch (error) {

        console.log("cannot get chat", error)
        res.send("error")
        
    }
}

const getMessageController = async(req , res, next)=>{
    try {

        const chatId = req.params.chatId
        const userId = req.userId

        const messages = await messageModel.find({chat : chatId , user : userId}).sort({createdAt :1})

        console.log(messages)
        res.status(200).json({
            message : "messages found", 
            success : true , 
            messages
        })

        
    } catch (error) {

        res.status(400).json({
            message : "cannot find messages"
        })
        
    }
}

const deleteChatController = async(req, res, next)=>{
    try {

    const userId = req.userId
    const chatId = req.params.chatId

    if(!chatId){
        return res.status(400).json({
            message : "chatID is required", 
            status : false
        })
    }

   
        const chat = await chatModel.findById(chatId)
    
        if(!chat){
            return res.status(404).json({
                message : "chat not found", 
                success : false
            })
        }


        const response = await chatModel.findByIdAndDelete(chatId);

        await messageModel.deleteMany({chat : chatId , user : userId})

        res.status(200).json({
            message : "chat deleted success", 
            success : true  
        })

        
        
    } catch (error) {

        console.log(error , "cannot delete chat");
        res.send("error bro error ")
        
    }
}



export {sendMessageController , getChatController , deleteChatController, getMessageController}
