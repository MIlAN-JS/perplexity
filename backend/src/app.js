import cookieParser from "cookie-parser"
import express from "express"
import authRouter from "./routes/auth.routes.js"


const app = express()
app.use(cookieParser())
app.use(express.json())



app.get("/",(req , res)=>{
    res.send("hello world")
})

app.use("/api/auth",authRouter)




export default app;