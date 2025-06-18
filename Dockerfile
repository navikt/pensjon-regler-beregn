# build frontend and server
FROM node:lts-alpine3.20 as build
WORKDIR /.
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
COPY entrypoint.sh ./entrypoint.sh
RUN npm ci

COPY /. ./
RUN npm run build
RUN npm run asciidoc

# production environment
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /public/doc /usr/share/nginx/html/doc/
COPY --from=build src/doc/images /usr/share/nginx/html/doc/images
COPY --from=build /entrypoint.sh /entrypoint.sh
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# 🔥 Fix: Make sure it's executable in this layer
RUN chmod +x /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]