import { useEffect, useState } from 'react'

import Dashboard from '../features/chat/ui/pages/Dashboard'
import { useSelector } from 'react-redux'

function App() {

  useEffect(()=>{
    
  }, [])
  
  const user = useSelector(state => state.auth.user)




  return (
    <>
     <h1>hello {user.userName}</h1>

    </>
  )
}

export default App
