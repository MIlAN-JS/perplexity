import { sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket.";
 import { useDispatch , useSelector } from 'react-redux';
import { setChats, setCurrentChat, setLoading, setMessages } from "../stateManager/chat.slice";

 const useChat = ()=>{

    const chatId = useSelector(state => state.chat.currentChatId)
    const dispatch = useDispatch()

    const handleSendMessage = async({humanMessage })=>{
        try {
            dispatch(setLoading(true))
            const data = await sendMessage({humanMessage , chatId});
            dispatch(setCurrentChat(data.response.chat._id))
            dispatch(setMessages(data.response.messages))
            dispatch(setChats(data.response.chat))
             
        } catch (error) {

            console.log("cannot call or handle sendMessage Api")
            
        }finally{
            setLoading(false)
        }
    }




    return {
        initializeSocketConnection, 
        handleSendMessage
    }
}


export default useChat