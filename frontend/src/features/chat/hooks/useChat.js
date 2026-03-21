import { getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket.";
 import { useDispatch , useSelector } from 'react-redux';
import { setChats, setCurrentChat, setLoading, setMessages } from "../stateManager/chat.slice";

 const useChat = ()=>{

    const chatId = useSelector(state => state.chat.currentChatId)
    const dispatch = useDispatch()

    const handleSendMessage = async({humanMessage })=>{
        try {
            // dispatch(setLoading(true))
            const data = await sendMessage({humanMessage , chatId});
            // dispatch(setCurrentChat(data.response.chat._id))
            // dispatch(setMessages(data.response.messages))
            // dispatch(setChats(data.response.chat))
            console.log(data)
             
        } catch (error) {

            console.log("cannot call or handle sendMessage Api", error)
            
        }finally{
            setLoading(false)
        }
    }

    const handleGetMessages = async(chatId)=>{
        try {
            const response  = await getMessages(chatId);
            dispatch(setMessages(response.messages))
        } catch (err) {
            consle.log("errr cannot get messages" , err)
            
        }
    }



    return {
        initializeSocketConnection, 
        handleSendMessage
    }
}


export default useChat