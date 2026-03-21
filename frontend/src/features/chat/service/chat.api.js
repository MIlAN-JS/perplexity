
import axios  from "axios"

const api = axios.create({
    baseURL : "http://localhost:3000/api/chat", 
    withCredentials : true
})




const sendMessage = async({humanMessage , chatId})=>{
    try {

        const response = await api.post("/send-message",{humanMessage,chatId});
        return response.data

        
    } catch (error) {

        console.log("Cannot send message " , error)
        
    }
}

export {
    sendMessage
}