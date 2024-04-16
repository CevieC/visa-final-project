# Build stage
FROM node:20.9.0-alpine as build
WORKDIR /app
COPY typing-simulator-frontend/package*.json ./
RUN npm ci
COPY typing-simulator-frontend/ .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist/typing-simulator-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]