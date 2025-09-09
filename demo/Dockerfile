# Use lightweight Java 17 runtime
FROM eclipse-temurin:17-jdk-jammy

# Set working directory inside container
WORKDIR /demo

# Copy built JAR file from local target folder
ARG JAR_FILE=target/demo-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

# Expose Spring Boot port
EXPOSE 8081

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
