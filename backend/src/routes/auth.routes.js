import {Router} from "express"
import {validateRegister , validateLogin} from "../validators/auth.validator.js"
import { getMeController, loginController, registerController , verifyEmailController } from "../controllers/auth.controller.js"
import { checkUser } from "../middlewares/auth.middlewares.js"




const authRouter = Router()

authRouter.post("/register",validateRegister ,registerController  )
authRouter.get("/verify-email", verifyEmailController)
authRouter.post("/login",validateLogin ,loginController )
authRouter.get("/get-me",checkUser ,getMeController )
export  default authRouter