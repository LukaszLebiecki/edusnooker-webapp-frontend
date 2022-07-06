FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/edusnooker-webapp-frontend/ /usr/share/nginx/html
