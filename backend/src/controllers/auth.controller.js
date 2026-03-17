import userModel from "../models/user.model.js"
import sendEmail from "../services/email.service.js"
import jwt   from "jsonwebtoken"
import chatWithAi from "../services/langchain.service.js"

const registerController = async(req , res , next)=>{
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

       const newUser = await userModel.create({
        email , password , userName
       })   

       const emailVerificationToken = jwt.sign({
        email : email
       } , process.env.JWT_SECRET)

       // link send using nodemailer for verification 
        sendEmail({
            to: email ,
            subject : "Welcome to my Perplexity !!", 
            html :` <h1>Hello ${userName}</h1>
                    <p>Click link below to verify your email </p>
    
                    <a href="http://localhost:3000/api/auth/verify-email?emailVerificationToken=${emailVerificationToken}" >Verify Email</a>
            ` ,  
            })

       res.status(201).json({
        message : "user created success",
        success : true, 
        user : newUser
       })
    
        
    } catch (error) {
        res.status(400).json({message : "cannot register user"})
        console.log(error)
    }
}

const verifyEmailController = async(req , res , next)=>{
    try {

        const {emailVerificationToken} = req.query
        if(!emailVerificationToken){
            res.status(400).json({
                message : "Invalid token", 
                success : false
            })
        }

        const decoded = jwt.verify(emailVerificationToken , process.env.JWT_SECRET)
        const user = await userModel.findOne({email : decoded.email})

        if(!user){
            res.status(400).json({
                message : "User not found", 
                success : false
            })
        }

        console.log(user)
        user.verified = true
        user.save()

        res.send(`
         <p>You can login now </p>   
         <a href= "http://localhost:3000/api/auth/login">Login </a>
            `)


        
        
       
        
        
    } catch (error) {
        console.log("cannot verify email", error)
        return res.status(400).json({
            message : "invalid token", 
            success : false
        })
    }
}

const loginController = async(req , res , next)=>{

    const {email , password} = req.body
    console.log(email , password)

        try {

            const user = await userModel.findOne({email}).select("+password")
console.log(user)
            if(!user){
                return res.status(400).json({
                    message : "user not found", 
                    success : false
                })
            }

            if(!user.verified){
                return res.status(400).json({
                    message : "Please verify you email before loggin in ", 
                    success : false
                })
            }

           const isPassTrue =await  user.comparePassword(password);
           console.log(isPassTrue)

            if(!isPassTrue){
                return res.status(400).json({
                    message : "invalid password",
                    success : false
                })
            }

            const token = jwt.sign({
              id :   user._id, 
            }, process.env.JWT_SECRET, {expiresIn : "5d"})

            res.cookie("token", token)

            res.status(200).json({
                message : "user is logged in ",
                success : true,
                user : {
                    _id : user._id, 
                   userName :  user.userName, 
                    email : user.email, 
                    verified : user.verified,
                    createdAt : user.createdAt, 
                    updatedAt: user.updatedAt
                }
            })


            


        } catch (error) {

            console.log("cannot login user", error)
            res.status(400).json({
                message : "cannot login user", 
                success : false
            })

            
        }

    }

const getMeController = async(req , res , next)=>{
    console.log("inside me")
        try {
            const userId = req.userId

            const user = await userModel.findById(userId);
            if(!user){
                res.status(400).json({
                    message : "user Not found", 
                    success : false
                })
            }

            res.status(200).json({
                message : "user found", 
                success : true , 
                user

            })




            
            
        } catch (error) {

            
            
        }

    }

const logoutController = async(req , res , next)=>{
        try {
            
        } catch (error) {
            
        }

    }

export {
    registerController, 
    verifyEmailController,
    loginController,
     logoutController,
     getMeController
}