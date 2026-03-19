import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {ChatMistralAI } from "@langchain/mistralai"
import {SystemMessage, HumanMessage} from "@langchain/core/messages"

import dotenv from "dotenv"
dotenv.config()


const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

const mistralModel = new ChatMistralAI({
    model  : "mistral-medium-latest"
})

const chatWithAi = async(query)=>{
    try {

        const response =await geminiModel.invoke(query);
        return response.content

        
    } catch (error) {

        console.log("cannot get response", error)
        
        
    }
}


const GenerateChatTitle = async(message)=>{

    try {
        console.log(message)
        const title = await mistralModel.invoke([
            new SystemMessage(" You are a helpful assistant that generates concise and descriptive titles for chat conversations. User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic."),

            new HumanMessage(` Generate a title for a chat conversation based on the following first message:
            "${message}"`)
        ])

        return title.content
   
        

    } catch (error) {

        console.log("failed to generate tittle haha ", error)
        
    }

}


export  { GenerateChatTitle , chatWithAi}


