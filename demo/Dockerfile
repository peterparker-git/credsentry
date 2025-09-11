# # Use lightweight Java 17 runtime
# FROM eclipse-temurin:17-jdk-jammy

# # Set working directory inside container
# WORKDIR /demo

# # Copy built JAR file from local target folder
# ARG JAR_FILE=target/demo-0.0.1-SNAPSHOT.jar
# COPY ${JAR_FILE} app.jar

# # Expose Spring Boot port
# EXPOSE 8081

# # Run the JAR
# ENTRYPOINT ["java", "-jar", "app.jar"]
# Stage 1: Build JAR with Maven
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /demo
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run Spring Boot app
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /demo
COPY --from=build /demo/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]

