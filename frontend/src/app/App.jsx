import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function App() {

  useEffect(()=>{
    
  }, [])
  
  const user = useSelector(state => state.auth.user)




  return (
    <>
     <h1>hello {user?.userName}</h1>

    </>
  )
}

export default App
