import { createSlice } from "@reduxjs/toolkit";

const  chatSlice = createSlice({
    name : "chat", 
    initialState : 'milan', 
    reducers : {
        checkChat : (state , payload)=>{
            console.log("yoo wassup", state)

        }
    }
})


export const {checkChat}  = chatSlice.actions;
export default chatSlice.reducer