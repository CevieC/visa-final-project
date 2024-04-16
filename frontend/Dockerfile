# Use an official Node.js runtime as the base image
FROM node:20.9.0-alpine

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

# Install a lightweight web server to serve the built files
RUN npm install -g http-server

# Expose the port on which the application will run
EXPOSE 8080

# Serve the built Angular application using http-server
CMD ["http-server", "dist/typing-simulator-frontend", "-p", "8080"]