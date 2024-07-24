//socketio brings realtime and bidirectional communication
import { Chat, connectDB } from './db.js';

import dotenv from 'dotenv'
dotenv.config({path : './.env'})

//const app = require('express')();
import express from 'express';
const app = express()

connectDB()

//const server = require('http').createServer(app);
import {createServer} from 'http';
const server = createServer(app)

import {Server} from 'socket.io';
const io = new Server(server,{
    cors: {
        origin: "*",
        allowedHeaders: ["my-custom-header"],
        credentials: true
      },
      connectionStateRecovery:{}
});
//const Server = require('socket.io')
//const io = Server(server,{})

io.on("connection", (socket)=>{
    //console.log("What is socket?", socket);
    console.log("socket is active to be connected");

    //inside the string, also called event, we can pass any parameter but some of strings are given by socket.io
    //We can see the by ctrl+ ,__,
    //paylosd is packet of information comming up
    
    //Any interruption in network will lead to server disconnection
    //Refresh of page-itloads wholepage and again build connection,
    //Change of network service provider.
    socket.on("disconnect",()=>{
        console.log('Socket disconnected')
    })

    socket.on("chat", (payload)=>{
        
        console.log("Recived payload:", payload);
        //To respond we always have to emit to the response
        //here we are throwing back what user is sending.
        //io.emit("chat", payload)


        const reply = {
            id: payload.id, //REPLACE ID WITH CURRENT USER ID
            message: `Server received: ${payload.message+" Its reply"}`,
          };
        
        //Save to database
        socket.emit("chat", reply)

        const currentChat = Chat.create(
            {
                user_id : payload.id,
                user_query : payload.message,
                bot_response : reply.message
            }
        )
        
    })
})


const PORT = process.env.PORT || 5000

server.listen(PORT, ()=>{
    console.log('Server is listening on port:',PORT)
})
