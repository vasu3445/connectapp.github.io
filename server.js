const express = require('express');
const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

// create route
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket
const io = require('socket.io')(http);

io.on("connection", (socket) => {
    console.log("Connected ...");
    socket.on("message", (msg)=>{
        socket.broadcast.emit('message', msg); // broadcast sends the message to all the connections connected to that socket except the one who from which data is received
    })
});
