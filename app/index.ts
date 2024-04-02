import express, { Express } from 'express';
import  { createServer } from  'http';
import ROSLIB from 'roslib';
import WebSocket from 'ws'; 

const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ 
    server: httpServer 
});

var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

wss.on('connection', function(ws) { 
    console.log('Connected to websocket server.');
    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send('Message received: ' + message);
    });
});

ros.on('connection', function() {
    console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});



app.use(express.static('./public'));
httpServer.listen(5000, () => console.log('Server is up and running'));