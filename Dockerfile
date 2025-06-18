# build frontend and server
FROM node:lts-alpine3.20 as build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
RUN npm ci

COPY ./ ./
RUN npm run build
RUN npm run asciidoc

# production environment
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/doc /usr/share/nginx/html/doc/
COPY --from=build /app/src/doc/images /usr/share/nginx/html/doc/images
COPY --from=build /app/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
