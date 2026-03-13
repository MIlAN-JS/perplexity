import {body , validationResult} from "express-validator"



const validateFunction = (req , res ,next)=>{


    const errors = validationResult(req);
    if(errors.isEmpty()){
      return next()
    }

    res.status(400).json({
        message : "error found", 
        errors : errors.array()
    })

}




const validateRegister = [
  
    validateFunction
]

export default validateRegister;