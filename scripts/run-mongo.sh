#!/bin/sh

docker ps -a -f status=exited
docker rm $(docker ps -a -f status=exited -q)
docker run --network=host -it --name test-mongod --env DO_CREATE_USERS=true my-mongod

echo "Done!"
exit 0
