// Node server soketio wala hai

const io = require("socket.io")(8000)

const users = {};

io.on("connection" , socket => {


    // New user jo hai wo connect krtaa hai toh sbko pta chlta hai
    socket.on("new-user-joined" , name=>{
        // console.log("New User" , name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined" , name);
    });



    // Hum koi message send krte hai toh sbko jayega broadcast k chlte 
    socket.on("send" , message =>{
        socket.broadcast.emit("receive" , {message : message , name : users[socket.id]})
    });


    
    // Koi choda ta hai chat ko
    socket.on("disconnect" , message =>{
        socket.broadcast.emit("leave" , users[socket.id])
        delete users[socket.id];
    });
})