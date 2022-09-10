docker build -t edusnookerfront .
docker stop edusnookerfront
docker rm edusnookerfront
docker run -d -p 4200:4200 --name edusnookerfront --network edusnooker-network edusnookerfront
