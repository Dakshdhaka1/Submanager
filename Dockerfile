# STAGE 1: "Build Stage" — compiles your Java code into a .jar
# We use Maven image because it has Java + Maven pre-installed
FROM maven:3.9-eclipse-temurin-17 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy pom.xml FIRST (Docker caches this layer, so dependencies
# don't re-download every time you change your code!)
COPY pom.xml .

# Download all dependencies (cached unless pom.xml changes)
RUN mvn dependency:go-offline

# NOW copy your actual source code
COPY src ./src

# Build the .jar file (skip tests to speed up)
RUN mvn package -DskipTests

# ──────────────────────────────────────────────
# STAGE 2: "Run Stage" — a tiny image that just runs the .jar
# (We don't need Maven anymore, just Java)
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy ONLY the built .jar from Stage 1
COPY --from=build /app/target/*.jar app.jar

# Tell Docker this container listens on port 8080
EXPOSE 8080

# The command to start your app
ENTRYPOINT ["java", "-jar", "app.jar"]
