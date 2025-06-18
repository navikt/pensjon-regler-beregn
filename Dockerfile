# build frontend and server
FROM node:lts-alpine3.20 as build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm ci
COPY ./ ./
RUN npm run build
RUN npm run asciidoc

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/doc /usr/share/nginx/html/doc/
COPY --from=build /app/src/doc/images /usr/share/nginx/html/doc/images
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
