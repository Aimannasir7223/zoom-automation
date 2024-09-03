// socket.js
const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('socket connected');
    });
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { initializeSocket, getIo };
