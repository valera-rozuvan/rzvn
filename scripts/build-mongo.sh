#!/bin/bash

cd ./dockerized_services/mongod
docker build -f ./Dockerfile --label mongod --tag mongod:latest .

echo "Done!"
exit 0
