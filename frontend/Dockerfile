# Stage 1: Build the Angular application
FROM node:20.9.0-alpine AS build

WORKDIR /app

COPY typing-simulator-frontend/package*.json ./

RUN npm ci

COPY typing-simulator-frontend/ .

RUN npm run build -- --output-path=./dist/typing-simulator-frontend --verbose

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/typing-simulator-frontend /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]