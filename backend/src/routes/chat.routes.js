import express from "express"
import { checkUser } from "../middlewares/auth.middlewares.js"
import { sendMessageController } from "../controllers/chat.controller.js"

const chatRouter = express.Router()






chatRouter.post("/send-message", checkUser , sendMessageController);


export default chatRouter