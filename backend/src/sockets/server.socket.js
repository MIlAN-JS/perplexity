import {Server} from "socket.io"

let io;
function initSocketServer(httpServer){
    // creating socket server using http server
    io = new Server(httpServer , {
        cors: {

            origin : "http://localhost:5173", 
            credentials : true

        }
    })
    console.log("socket io is connected")
    io.on("connection", (socket)=>{
        console.log("socket connected", socket.id)



    })


}


function getIo(){


    return io;
}


export {
    initSocketServer , getIo
}
