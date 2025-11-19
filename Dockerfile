# ---------- Build stage ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

WORKDIR /app

COPY --chown=node:node package*.json tsconfig*.json vite.config.ts ./
RUN npm ci

COPY --chown=node:node . .

RUN npm run build
RUN npm run asciidoc

# ---------- Runtime stage ----------
FROM cgr.dev/chainguard/nginx:latest

COPY --from=build --chown=nonroot:nonroot /app/dist /usr/share/nginx/html
COPY --from=build --chown=nonroot:nonroot /app/public/doc /usr/share/nginx/html/doc
COPY --from=build --chown=nonroot:nonroot /app/src/doc/images /usr/share/nginx/html/doc/images
COPY --chown=nonroot:nonroot ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["/usr/bin/nginx", "-g", "daemon off;"]