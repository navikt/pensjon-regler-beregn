FROM node:13.12.0-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent

# NGINX
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# NODE
COPY node_modules/ ./node_modules/

EXPOSE 80

CMD ["nginx" "-g" "daemon off;"]