import ROSLIB from 'roslib';
import os from  'os';
import { webSocketClients } from './websocket';

function getLocalIP(): string {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces){
        if (interfaces[name]) {
            for (const iface of interfaces[name]!) {
                const {address, family, internal} = iface;
                if (family === 'IPv4' && !internal){
                    return address;
                }
            }
        }
    }
    return 'localhost';
}

const ROSBRIDGE_SERVER_URL = `ws://${getLocalIP()}:9090`;

const ros = new ROSLIB.Ros({
    url: ROSBRIDGE_SERVER_URL
});

ros.on('connection', () => {
    console.log('Connected to ros2 websocket server: ', ROSBRIDGE_SERVER_URL);
});

ros.on('error', (error) => {
    console.error('Error connecting to websocket server: ', error);
});

// Create a ROS topic listener for the /fix topic
const navSatFixListener = new ROSLIB.Topic({
    ros: ros,
    name: '/fix',
    messageType: 'sensor_msgs/NavSatFix'
});

navSatFixListener.subscribe((message: ROSLIB.Message) => {
    console.log('Received message on %s: %s', navSatFixListener.name, (message as any).latitude);
});

// Create a ROS topic listener for the /chatter topic
const chatterListener = new ROSLIB.Topic({
    ros: ros,
    name: '/chatter',
    messageType: 'std_msgs/String'
});

chatterListener.subscribe((message: ROSLIB.Message) => {
    console.log('Received message on %s: %s', chatterListener.name, (message as any).data);
    webSocketClients.forEach((client) => {
        client.send((message as any).data);
    });
});