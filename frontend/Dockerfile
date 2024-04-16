# Use an official Node.js runtime as the base image
FROM node:20.9.0-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY typing-simulator-frontend/package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the entire frontend application to the working directory
COPY typing-simulator-frontend/ .

# Build the Angular application
RUN npm run build

# Use an Nginx base image
FROM nginx:alpine

# Copy the built Angular files to the Nginx HTML directory
COPY --from=build /app/dist/typing-simulator-frontend /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the application will run
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]