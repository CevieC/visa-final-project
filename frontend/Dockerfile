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

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Expose the port on which the application will run
EXPOSE 8080

# Serve the Angular application using the Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080", "--disable-host-check"]