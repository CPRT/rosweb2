# ROS2 Web Interface

This project provides a web interface for interacting with a robot running ROS2. It allows you to send commands to the robot and receive data from it in real-time.

## Features
TO BE ADDED!
- **Video Feeds**: View live video feeds from the robot's cameras.
- **Teleoperation**: Control the robot's movements remotely from the web interface.
- **GNSS Coordinates**: View the robot's current GNSS coordinates.
- And many more

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Run ```bash docker compose up --build ``` to build and run the nginx and node.js server.
2. Access through your browser of choice (brave used in testins) through specified port, [0.0.0.0:5000](0.0.0.0:5000) by default

## Built With

* [ROS2](http://www.ros.org/) - The robot operating system used
* [Docker](https://www.docker.com/) - Containerization platform
* [Nginx](https://www.nginx.com/) - HTTP and reverse proxy server
* [Node.js](https://nodejs.org/) - JavaScript runtime

## Authors

* **Mateusz Tyc** - *Initial work* - [Noodle Kid](https://github.com/noodlekid)