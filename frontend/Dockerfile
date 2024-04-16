# Use an official Node.js runtime as the build stage
FROM node:20.9.0-alpine AS build

# Set the working directory in the container for the build stage
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY typing-simulator-frontend/package*.json ./

# Install the application dependencies
RUN npm ci

# Copy the entire frontend application to the working directory
COPY typing-simulator-frontend/ .

# Build the Angular application for production
RUN npm run build --prod

# Use an official Nginx runtime as the base image for the production stage
FROM nginx:stable-alpine

# Copy the built Angular files from the build stage to the Nginx HTML directory
COPY --from=build /app/dist/typing-simulator-frontend /usr/share/nginx/html

# Expose the port on which Nginx will run
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]