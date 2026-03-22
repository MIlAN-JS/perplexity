
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


const getMessages = async(chatId)=>{

    try {

        const response = await api.get(`/get-message/${chatId}`);
        return response.data
        
    } catch (error) {

        console.log("cannot get messages ", error)
        
    }

}

const getAllChat = async ()=>{
    try {
        
        const response = await api.get("/get-chats");
        return response.data

    } catch (error) {
        console.log("cannot get all chat", error)
    }
}

export {
    sendMessage, 
    getMessages, 
    getAllChat
}