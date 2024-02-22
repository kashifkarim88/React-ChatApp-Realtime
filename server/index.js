const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io")
const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());

const users=[{}]

app.get("/",(_,res)=>{
    res.send("server is on");
})


const server = http.createServer(app);
const io = socketIO(server);
io.on("connection",(socket)=>{
    console.log("new connection");

    socket.on("joined",({user})=>{
        users[socket.id] = user;
        console.log(`${user} has joined`)
        socket.broadcast.emit("user joined",{user:"Admin",message:`${users[socket.id]} has joined`})
        socket.emit("welcome",{user:"Admin",message:`welcome to the chat, ${users[socket.id]}`})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit("leave",{user: "Admin",message:`${users[socket.id]} has left the chat`})
        console.log("user left")
    })
    socket.on("message",({message,id})=>{
        io.emit("sendMessage",{user:users[id],message,id})
    })

})
server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
