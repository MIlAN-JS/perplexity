import { createSlice, current } from "@reduxjs/toolkit";

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
      
        const chat = action.payload
            const isChatExists = state.chats.find(c => c._id === chat._id )

          if(!isChatExists){
            state.chats.push(chat)
          }
          console.log(state.chats)

        },

      setMessages : (state , action)=>{
        state.messages = [...messages , action.payload]
      }, 

      setCurrentChat : (state , action)=>{
        state.currentChatId = action.payload
      }, 
      
      setLoading : (state , action)=>{
        state.loading = action.payload
      }

      

    }
})

export const {setChats , setMessages , setCurrentChat , setLoading} =  chatSlice.actions;
export default chatSlice.reducer;