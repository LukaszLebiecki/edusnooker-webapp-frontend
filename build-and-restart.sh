docker build -t edusnookerfront .
docker stop edusnookerfront
docker rm edusnookerfront
docker run -d -p 4200:80 --name edusnookerfront edusnookerfront
