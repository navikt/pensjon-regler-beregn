FROM node:13.12.0-alpine as build

WORKDIR /app

RUN apt-get update && apt-get -y install nginx && apt-get -y install gettext-base

# NGINX
COPY nginx/fss.conf /etc/nginx/conf.d/app.conf.template
COPY /build /usr/share/nginx/html

# NODE
COPY node_modules/ ./node_modules/

EXPOSE 8080

CMD []nginx -g "daemon off;"]