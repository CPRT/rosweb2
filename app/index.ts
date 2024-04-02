import express, { Express } from 'express';
import  { createServer } from  'http';
import { Server } from 'socket.io';
import ROSLIB from 'roslib';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});


io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}); 

app.use(express.static('./public'));
httpServer.listen(5000, () => console.log('Server is up and running'));