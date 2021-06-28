FROM navikt/java:11
COPY target/satsviewer.jar /satsviewer.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/satsviewer.jar"]