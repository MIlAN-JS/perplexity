import mongoose from "mongoose"


const connectToDB = async()=>{
try {
    
    const resposne = await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to databse")
    
} catch (error) {
    
    console.log("cannot connect with database ");
}
}

export default connectToDB;