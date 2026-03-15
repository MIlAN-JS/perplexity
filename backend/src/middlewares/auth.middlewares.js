
import jwt from "jsonwebtoken"


const checkUser = (req , res , next)=>{
    console.log("cookies", req.cookies.token)
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                message : " token required", 
                success : false
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.userId = decoded.id
        
        next()




        
    } catch (error) {

        console.log("error ", error)

        res.status(400).json({
            message : "invalid token",
            success : false
            
        })
        
    }
}

export {
    checkUser
}