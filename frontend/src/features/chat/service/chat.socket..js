import {io} from "socket.io-client"




export const initializeSocketConnection = ()=>{
    const socket = io("http://localhost:3000", {
        withCredentials : true
    })

    socket.on("connect", (socket)=>{
        console.log("socket is connected with backend socket server ")
    })
}