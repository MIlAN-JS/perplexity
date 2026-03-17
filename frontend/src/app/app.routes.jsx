import {createBrowserRouter} from "react-router-dom"
import Login from "../features/auth/ui/pages/Login"
import Register from "../features/auth/ui/pages/Register"
import App from "./App"


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
    }
])

export default router