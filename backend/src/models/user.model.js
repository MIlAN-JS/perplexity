import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName : {
        type: String, 
        required : [true , "userName is required"]
    },
    email : {
        type: String, 
        required : [true , "email is required"]
    },
    password : {
        type: String, 
        required : [true , "password is required"]
    },
    verified : {
        type : Boolean ,
        default : false 
    }
}, {timestamps : true})



userSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
    



})

userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}


const userModel = mongoose.model("userModel", userSchema)

export default userModel