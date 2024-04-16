# Use an official Node.js runtime as the base image
FROM node:20.9.0-alpine as build

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

# Print the contents of the dist directory
RUN ls -l dist/typing-simulator-frontend

# Use an official Nginx runtime as the base image
FROM nginx:alpine

# Print the contents of the Nginx directory
RUN ls -l /usr/share/nginx/html

# Copy the built Angular files to the Nginx directory
COPY --from=build /app/dist/typing-simulator-frontend /usr/share/nginx/html

# Print the contents of the Nginx directory after copying
RUN ls -l /usr/share/nginx/html

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose the port on which the application will run
EXPOSE 8080

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]