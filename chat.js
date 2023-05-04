const express=require('express');
const socket=require('socket.io');
const http=require('http');
const app=express();
const server=http.createServer(app);
const io=socket(server);
// const chat=io.of('/chats')
io.on("connection",(socket)=>{
    console.log(socket)
    console.log("user joined")
})

server.listen(8080,()=>{ 
    console.log("chat server is running on port 8080")
}) 