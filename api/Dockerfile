FROM java:8
COPY ./target/api-1.0-SNAPSHOT.jar api.jar
CMD ["java", "-Xmx200m", "-jar", "/api.jar"]

EXPOSE 8080