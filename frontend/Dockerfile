# Build stage
FROM node:18-bullseye-slim AS build
WORKDIR /app
# copy package files first to leverage layer caching
COPY package*.json ./
# use npm install since package-lock.json is not committed
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# Production stage - serve build with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional: copy a custom nginx.conf if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
