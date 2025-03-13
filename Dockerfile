# build frontend and server
FROM node:lts-alpine3.20 as build
WORKDIR /.
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm ci

COPY /. ./
RUN npm run build
RUN npm run asciidoc

# production environment
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /public/doc /usr/share/nginx/html/doc/
COPY --from=build src/doc/images /usr/share/nginx/html/doc/images
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]