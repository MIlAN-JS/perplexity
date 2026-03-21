import {createBrowserRouter} from "react-router-dom"
import Login from "../features/auth/ui/pages/Login.jsx"
import Register from "../features/auth/ui/pages/Register.jsx"
import App from "./App"
import ChatPage from "../features/chat/ui/pages/ChatPage.jsx"



const router = createBrowserRouter([
    {

        path: "/", 
        element: <App/>


    }, 
    {
        path: "/login", 
        element: <Login/>
    }, 
    {
        path: "/register", 
        element: <Register/>
    }, {
        path : "/chat", 
        element : <ChatPage/>
    }
])

export default router