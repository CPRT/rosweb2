#!/bin/bash
export ROSBRIDGE_SERVER_IP=$(ip -4 addr show scope global | grep inet | awk '{print $2}' | cut -d / -f 1 | grep -m 1 '^192')
docker-compose up --build