import { getAllChat, getMessages, sendMessage } from "../service/chat.api";
import { initializeSocketConnection } from "../service/chat.socket.";
 import { useDispatch , useSelector } from 'react-redux';
import { setChats, setCurrentChat, setLoading, setMessages , addChat } from "../stateManager/chat.slice";

 const useChat = ()=>{

    const chatId = useSelector(state => state.chat.currentChatId)
    const dispatch = useDispatch()

    const handleSendMessage = async({humanMessage })=>{
        try {
            dispatch(setLoading(true))
            const data = await sendMessage({humanMessage , chatId});
            console.log(data)
            dispatch(setCurrentChat(data.response.chat._id))
            
            dispatch(setMessages(data.response.messages))
            dispatch(addChat(data.response.chat))
           
             
        } catch (error) {

            console.log("cannot call or handle sendMessage Api", error)
            
        }finally{
            dispatch(setLoading(false))
        }
    }

    const handleGetMessages = async(chId)=>{
        try {
            console.log(chId)
                const response  = await getMessages(chId);

                dispatch(setMessages(response.messages))
                console.log(response.messages)
        } catch (err) {
            console.log("errr cannot get messages" , err)
            
        }
    }

    const handleGetAllChat = async()=>{

        try {
            dispatch(setLoading(true))
            const data = await getAllChat()
           dispatch(setChats(data.chats))

           if(data.chats.length > 0 ){
            dispatch(setCurrentChat(data.chats[0]._id))
            handleGetMessages(data.chats[0]._id)
           }

        } catch (error) {
            
            console.log("cannot get all chats", error)
        }finally{
            dispatch(setLoading(false))
        }

    }

     

    return {
        initializeSocketConnection, 
        handleSendMessage, 
        handleGetAllChat, 
        handleGetMessages
    }
}


export default useChat