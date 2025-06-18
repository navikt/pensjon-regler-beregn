FROM node:lts-alpine3.20 AS build
WORKDIR /app
COPY package*.json tsconfig*.json vite.config.ts ./
RUN npm ci
COPY . .
RUN npm run build && npm run asciidoc

FROM nginx:alpine
RUN mkdir -p /var/cache/nginx/client_temp && \
    chmod -R 777 /var/cache/nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/doc /usr/share/nginx/html/doc
COPY --from=build /app/src/doc/images /usr/share/nginx/html/doc/images
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
