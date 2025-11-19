FROM cgr.dev/chainguard/node:latest-dev AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run asciidoc

# ---------- Runtime stage ----------
FROM cgr.dev/chainguard/nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/doc /usr/share/nginx/html/doc/
COPY --from=build /app/src/doc/images /usr/share/nginx/html/doc/images
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]