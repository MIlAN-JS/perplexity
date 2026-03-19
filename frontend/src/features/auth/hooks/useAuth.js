    import { useDispatch } from "react-redux"
    import { loginUser, registerUser } from "../services/auth.api"
    import { setLoading, setUser } from "../stateManager/auth.slice"
import { useNavigate } from "react-router"



    const useAuth = ()=>{

        const dispatch = useDispatch()
        const navigate = useNavigate()

        const handleRegister = async ({userName , email , password})=>{

            try {
                dispatch(setLoading(true))
                const response = await registerUser({userName, email, password})
                console.log("response is " , response, response.user)
                dispatch(setUser(response.user))
                navigate("/")


                
            } catch (error) {

                console.log("error", error)
            
            }finally{
                dispatch(setLoading(false))
            }
        }
        
        const handleLogin = async ({email  , password})=>{
            try {
                dispatch(setLoading(true))
                const response = await loginUser({email , password});
                dispatch(setUser(response.user));
                
              
                
            } catch (error) {

                console.log("cannot login user" , error)
                
            }finally{
                dispatch(setLoading(false))
            }
        }
        


        return {handleRegister, handleLogin}
    }


    export default useAuth