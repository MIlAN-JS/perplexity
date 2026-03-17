import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(false);

   const [email, setEmail ] = useState("")
   const [password, setPassword ] = useState("")
   const [userName, setUserName ] = useState("")
    const{handleRegister} = useAuth()


  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({email, password, userName})

  };

 

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-white mb-1">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          {isLogin ? "Sign in to your account" : "Fill in the details below to register"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username - only on Register */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)}}
                placeholder="johndoe"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="john@example.com"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
             value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition"
            />
          </div>

          {/* Live State Preview */}
         
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sky-400 hover:bg-sky-300 text-gray-950 font-semibold text-sm py-2.5 rounded-lg transition active:scale-95"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sky-400 hover:underline font-medium"
          >
            {isLogin ? "Register" : "Sign in"}

          </button>
        </p>
      </div>
    </div>
  );


}