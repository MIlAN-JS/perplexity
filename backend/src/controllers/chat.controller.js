import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { GenerateChatTitle, chatWithAi } from "../services/langchain.service.js";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
const sendMessageController = async(req, res , next)=>{



    try {
        
        // fetch data

        const humanMessage  =  req.body?.message
        const userId = req.userId
        const chatId = req.body?.chatId
        console.log(chatId)
        


            let newChat
            if(!chatId ){      
                console.log("i runned")
        //Generate a title 
            const title = await GenerateChatTitle(humanMessage);
            console.log(title) 
        // create a new chat
          newChat = await chatModel.create({user : userId , title : title })

            }


        // //store message 

         const message = await messageModel.create({chat : newChat._id || chatId , role : "human" , user : userId , message : humanMessage })

        // // fetch all the messages of the chat 

         const chatMessages = await messageModel.find({chat : chatId || newChat._id})
            
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
            chat : chatId || newChat._id,
            user : userId
         })




        res.status(201).json({
            aiResponse
        })



        // get response and store response 

    
        

    } catch (error) {

        console.log("cannot send message" , error)
        
    }

} 




export {sendMessageController}
