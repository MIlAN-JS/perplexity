import express from "express"
import { checkUser } from "../middlewares/auth.middlewares.js"
import { deleteChatController, getChatController, getMessageController, sendMessageController } from "../controllers/chat.controller.js"


const chatRouter = express.Router()






chatRouter.post("/send-message", checkUser , sendMessageController);
chatRouter.get("/get-chats", checkUser , getChatController);
chatRouter.get("/get-message/:chatId", checkUser, getMessageController )
chatRouter.delete('/delete-chat/:chatId', checkUser, deleteChatController)

export default chatRouter