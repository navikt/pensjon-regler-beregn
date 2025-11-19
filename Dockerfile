# ---------- Build stage ----------
FROM cgr.dev/chainguard/node:latest-dev AS build

WORKDIR /app

# Copy only package files first (caching)
COPY --chown=node:node package*.json tsconfig*.json vite.config.ts ./

# Install ALL dependencies (including devDependencies) for the build
# Do NOT use --omit=dev here — you need tsc, vite, etc.
RUN npm ci

# Now copy source code with correct ownership
COPY --chown=node:node . .

# Build the app and generate docs
RUN npm run build
RUN npm run asciidoc

# ---------- Runtime stage ----------
FROM cgr.dev/chainguard/nginx:latest

# nginx runs as nonroot (65532), so files must be owned correctly
COPY --from=build --chown=nonroot:nonroot /app/dist /usr/share/nginx/html
COPY --from=build --chown=nonroot:nonroot /app/public/doc /usr/share/nginx/html/doc
COPY --from=build --chown=nonroot:nonroot /app/src/doc/images /usr/share/nginx/html/doc/images

COPY --chown=nonroot:nonroot ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]