# Build stage
FROM node:18-bullseye-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# Production stage - serve build with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional: copy a custom nginx.conf if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
