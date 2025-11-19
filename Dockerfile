FROM cgr.dev/chainguard/node:latest-dev AS build
WORKDIR /app
COPY --chown=node:node package*.json tsconfig*.json vite.config.ts ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
RUN npm run build
RUN npm run asciidoc

# Tiny, secure, non-root nginx image from Chainguard
FROM cgr.dev/chainguard/nginx:latest

COPY --from=build --chown=nonroot:nonroot /app/dist /usr/share/nginx/html
COPY --from=build --chown=nonroot:nonroot /app/public/doc /usr/share/nginx/html/doc
COPY --from=build --chown=nonroot:nonroot /app/src/doc/images /usr/share/nginx/html/doc/images
COPY --chown=nonroot:nonroot ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]