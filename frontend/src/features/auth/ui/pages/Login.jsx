 
 import { use, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
 
 
 
 function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate()

  const {handleLogin} = useAuth()

  const submitHandler = (e)=>{
    e.preventDefault();

    handleLogin({email , password})
    navigate('/chat')

    
    

  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      <form
      onSubmit={submitHandler}
      className="bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm">
        
        <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email} 
          onChange={(e)=>{setEmail(e.target.value)}}
          className="w-full mb-4 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-sky-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          placeholder="Password"
          className="w-full mb-6 p-2 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-sky-400"
        />

        <button type="submit" className="w-full bg-sky-400 text-black font-semibold py-2 rounded-lg hover:bg-sky-500 transition">
          Login
        </button>

      </form>


    </div>
  );
}


export default Login