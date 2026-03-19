import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import chatRouter from "./routes/chat.routes.js"


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin : "http://localhost:5173", 
    credentials : true
}))



app.get("/",(req , res)=>{
    res.send("hello world")
})

app.use("/api/auth",authRouter)
app.use("/api/chat", chatRouter)


export default app;