import express, { Express } from 'express';
import  { createServer } from  'http';
import ROSLIB from 'roslib';
import WebSocket from 'ws'; 


const app = express();
const httpServer = createServer(app);
const wss = new WebSocket.Server({ 
    server: httpServer 
});
const ROSBRIDGE_SERVER_URL = 'ws://192.168.55.1:9090';


var ros = new ROSLIB.Ros({
    url: ROSBRIDGE_SERVER_URL // URL to your ROSBridge server, in this case running on the same machine as the web server.
});

ros.on('connection', function() {
    console.log('Connected to ROSBridge server.');
});

ros.on('error', function(error) {
    console.log('Error connecting to ROSBridge server:', error);
});

ros.on('close', function() {
    console.log('Disconnected from ROSBridge server.');
});

wss.on('connection', function(ws) { 
    console.log('Connected to websocket server.');
    ws.on('message', function(message) {
        console.log('received: %s', message);
        ws.send('Message received: ' + message);
    });
});

// ROS topic listener to the /fix topic
var listener = new ROSLIB.Topic({
    ros: ros,
    name: '/fix',
    messageType: 'sensor_msgs/NavSatFix'
});

listener.subscribe(function(message: ROSLIB.Message) {
    console.log('Received message on %s: %s', listener.name, (message as any).latitude);
});

// ROS topic listener to the /chatter topic 
var listener2 = new ROSLIB.Topic({
    ros: ros,
    name: '/chatter',
    messageType: 'std_msgs/String'
});


let clients: WebSocket[] = [];

wss.on('connection', ws => {
    clients.push(ws);
});

listener2.subscribe(function(message: ROSLIB.Message) {
    console.log('Received message on %s: %s', listener2.name, (message as any).data);
    clients.forEach(client => {
        client.send((message as any).data);
    });
});


app.use(express.static('./public'));
httpServer.listen(5000, () => console.log('Server is up and running'));