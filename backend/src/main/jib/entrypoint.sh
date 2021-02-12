#!/bin/sh

echo "The application will start in ${IKONS_SLEEP}s..." && sleep ${IKONS_SLEEP}
exec java ${JAVA_OPTS} -noverify -XX:+AlwaysPreTouch -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "com.ikons.requestmanagement.RequestManagementApplication"  "$@"
