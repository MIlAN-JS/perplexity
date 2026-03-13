import userModel from "../models/user.model.js"
import sendEmail from "../utils/email.utils.js"

const authController = async(req , res , next)=>{
    try {
     const {email , password , userName } = req.body

      const user = await userModel.findOne({
        $or : [
            {email},
            {userName}
        ]
      })

      if(user){
        return res.status(400).json({
            message : "user with same email or userName already exists",
            success : false 
        })
      }

       const response = await userModel.create({
        email , password , userName
       })   

       // link send using nodemailer for verification 
        sendEmail({to: email ,subject : "ID hacked .. Loading", html :` <h1>Sanchai hununxa ${userName} daju</h1>` , text : "Yo bro wassup " })

       res.status(201).json({
        message : "user created success",
        success : true
       })
    
        
    } catch (error) {
        res.status(400).json({message : "cannot register user"})
        console.log(error)
    }
}


export {
    authController
}