# ROS2 Web Interface

This project provides a web interface for interacting with a robot running ROS2. It allows you to send commands to the robot and receive data from it in real-time.

## Features (not implemented just yet)
- **Live Data Streaming**: View real-time data from the robot's sensors.
- **Video Feeds**: View live video feeds from the robot's cameras.
- **Teleoperation**: Control the robot's movements remotely from the web interface.
- **GNSS Coordinates**: View the robot's current GNSS coordinates.
- **WebSocket Communication**: Real-time bidirectional communication between the server and the client.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Run `docker compose up --build` to build and run the Nginx and Node.js server.
2. Access the web interface through your browser of choice at [http://0.0.0.0:5000](http://0.0.0.0:5000).

## Built With

* [ROS2](http://www.ros.org/) - The robot operating system used
* [Docker](https://www.docker.com/) - Containerization platform
* [Nginx](https://www.nginx.com/) - HTTP and reverse proxy server
* [Node.js](https://nodejs.org/) - JavaScript runtime
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - Protocol used for real-time communication

## Authors

* **Mateusz Tyc** - *Initial work* - [Noodle Kid](https://github.com/noodlekid)