import express from "express"
import { checkUser } from "../middlewares/auth.middlewares.js"
import { getChatController, sendMessageController } from "../controllers/chat.controller.js"

const chatRouter = express.Router()






chatRouter.post("/send-message", checkUser , sendMessageController);
chatRouter.get("/get-chat/:chatId", checkUser , getChatController )

export default chatRouter