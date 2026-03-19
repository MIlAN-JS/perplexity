import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : null, 
    loading : true
}

const authSlice = createSlice({
    name : "auth", 
    initialState, 
    reducers : {

        setUser : (state , action)=>{
            console.log("payload is ", action.payload)
            state.user = action.payload

            console.log(state.user)


        }, 

        setLoading : (state , action)=>{
            state.loading = action.payload
        }, 

        setError : (state , action)=>{
            state.error = action.payload
        }


    }
})

export const {setUser , setLoading , setError} = authSlice.actions
export default authSlice.reducer