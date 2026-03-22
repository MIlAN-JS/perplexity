import { createSlice, current } from "@reduxjs/toolkit";
import { isCancel } from "axios";

const initialState = {
    loading : true , 
    chats : [], 
    messages : [] ,
    currentChatId : null
}

const chatSlice = createSlice({
    name : "chat", 
    initialState , 
    reducers : {

      setChats : (state , action)=>{
      
        const chat = action.payload.flat()
        state.chats = chat

        
          //   const isChatExists = state.chats.find(c => c._id === chat._id )

          // if(!isChatExists){
          //   state.chats.push(chat)
          // }


        },

        addChat : (state , action)=>{
          const chat = action.payload

         let isChatExist = state.chats.find(c => c._id === chat._id)

          if(isChatExist){
            return
          }
          state.chats.unshift(chat)
        },
      setMessages : (state , action)=>{
      
        state.messages = action.payload
       
      }, 

      setCurrentChat : (state , action)=>{
        state.currentChatId = action.payload
      }, 
      
      setLoading : (state , action)=>{
        state.loading = action.payload
      }

      

    }
})

export const {setChats , setMessages , setCurrentChat , setLoading , addChat} =  chatSlice.actions;
export default chatSlice.reducer;