# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and project descriptor
COPY typing-simulator-backend/mvnw .
COPY typing-simulator-backend/.mvn .mvn
COPY typing-simulator-backend/pom.xml .

# Grant execute permissions to the Maven wrapper script
RUN chmod +x mvnw

# Copy the application source code
COPY typing-simulator-backend/src src

# Build the application using Maven
RUN ./mvnw clean package -DskipTests

# Expose the port on which the application will run
EXPOSE 8080 80

# # Run the Spring Boot application
# CMD ["java", "-jar", "target/typing-simulator-backend-0.0.1-SNAPSHOT.jar"]

# Set the entrypoint command
ENTRYPOINT ["sh", "-c", "java -jar target/typing-simulator-backend-0.0.1-SNAPSHOT.jar --server.port=8080 --debug"]

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

