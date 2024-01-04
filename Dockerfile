# build frontend and server
FROM node:lts-alpine3.19 as build
WORKDIR /.
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
WORKDIR /src/server
COPY /src/server/package.json /src/server/package-lock.json /src/server/tsconfig.json ./src/server/
RUN npm ci


WORKDIR /.
COPY /. ./
RUN npm run build

# production environment
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /dist /usr/share/nginx/html
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]