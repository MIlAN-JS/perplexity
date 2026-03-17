import {configureStore} from "@reduxjs/toolkit"
import chatReducer from "../features/chat/stateManager/chat.slice.js"
import authReducer from "../features/auth/stateManager/auth.slice.js"
const store = configureStore({
    reducer : {
        chat : chatReducer, 
        auth : authReducer
    }
})


export default store