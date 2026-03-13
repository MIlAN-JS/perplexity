import {Router} from "express"
import validateRegister from "../validators/auth.validator.js"
import { authController } from "../controllers/auth.controller.js"




const authRouter = Router()

authRouter.post("/register",validateRegister ,authController  )


export  default authRouter