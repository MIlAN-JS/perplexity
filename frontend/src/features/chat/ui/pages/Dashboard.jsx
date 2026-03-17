import React, { useEffect } from 'react'
import { useChat } from '../../hooks/useChat'
import { useSelector, useDispatch } from 'react-redux'
import { checkChat } from '../../stateManager/chat.slice'

const Dashboard = () => {
   const user = useSelector(state => state.auth)
   console.log("user  is " , user)
const {initializeSocketConnection} = useChat()
    useEffect(()=>{
        initializeSocketConnection()
    }, [])

    const dispatch = useDispatch()
    const myMsg = useSelector((state)=> state)
    console.log(myMsg)

  return (
    // <div>Dashboard: {user}</div>
    <></>
  )
}

export default Dashboard