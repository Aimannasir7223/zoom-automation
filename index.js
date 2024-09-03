const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const participantRouter = require('./routers/participantRouter');
const webinarRouter = require('./routers/webinarRouter');
const meetingRouter = require('./routers/meetingRouter');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors package
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require("path");
const { initializeSocket } = require("./utils/socket.io")

// CORS configuration
const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Enable this if you need to allow cookies
};

app.use(cors(corsOptions)); // Use CORS with the specified options

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
// Initialize WebSocket server
initializeSocket(server);

app.use('/api/webinars', webinarRouter);
app.use('/api/meetings', meetingRouter);
app.use('/api/participants', participantRouter);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
module.exports = server;