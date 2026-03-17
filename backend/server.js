import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import {createServer} from "http"
import { initSocketServer , getIo } from "./src/sockets/server.socket.js"

const httpServer =  new createServer(app)



initSocketServer(httpServer)
connectToDB()
const port = process.env.PORT || 3000

httpServer.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
})