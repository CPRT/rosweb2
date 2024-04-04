import ROSLIB from 'roslib';
import { webSocketClients } from './websocket';

const ROSBRIDGE_SERVER_URL = `ws://${process.env.ROSBRIDGE_SERVER_IP}:9090`;

function connectToRos(){
    const ros = new ROSLIB.Ros({
        url: ROSBRIDGE_SERVER_URL
    });

    ros.on('connection', () => {
        console.log('Connected to ros2 websocket server: ', ROSBRIDGE_SERVER_URL);
    });

    ros.on('error', (error) => {
        console.error('Error connecting to websocket server: ', error);
        console.log('Attempting to reconnect in 5 seconds...');
        setTimeout(connectToRos, 5000);
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

}

connectToRos();