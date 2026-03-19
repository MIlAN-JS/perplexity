import axios from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth", 
    withCredentials : true
})



const registerUser = async({email  , password, userName})=>{
    try {

        const response = await api.post("/register", {email, password , userName});
        return response.data
        
    } catch (error) {

        console.log("error to register user ", error)
        
    }
}



const loginUser = async({email, password})=>{
    try {

        const response = await api.post("/login", {email, password})
        return response.data
        
    } catch (error) {
        console.log("error to login user ", error)  
    }
}
// const getUser = async()=>{
//     try {

//         const response = await api.post("/login", {email, password})
//         return response.data
        
//     } catch (error) {
//         console.log("error to login user ", error)  
//     }
// }
export {registerUser, getUser}