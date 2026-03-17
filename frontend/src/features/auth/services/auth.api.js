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

export {registerUser}