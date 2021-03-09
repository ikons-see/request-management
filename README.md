# RequestManagement

This application is compose by three submodules: core, backend and frontend.

core and backend as java modules, meanwhile frontend is a javascript/angular module.

## Backend Development 

Firs you have to star the RDBMS server, and we use docker mariadb image for this purpose:

```
docker-compose -f ./backend/src/main/docker/mariadb.yml up -d
```

Build the frontend using the follow command.
```
./gradlew clean build -x test
```

Run the application:

```
./gradlew bootRun

```

To stop mariadb and remove the container, run:

```
docker-compose -f ./backend/src/main/docker/mariadb.yml down
```


## Frontend Development

Frontend project is base on an angular framework.
When you get the project you need to install the dependencies. Make sure the working directory is './frontend'

```
cd frontend
```
then run 
```
npm install
```

After the dependencies installed you should see the node_modules directory inside fronted submodule.
Then you run 

```
npm run start
```

### Using Angular CLI

For example, the following command:

```
ng generate component my-component
```

will generate few files:

```
create src/app/my-component/my-component.component.html
create src/app/my-component/my-component.component.ts
update src/app/app.module.ts
```

## Building for production

```
./gradlew -Pprod bootJar 
```

## Create Backend image

```
./gradlew -Pprod jibDockerBuild
```

### Packaging as jar

To build the final jar and optimize the RequestManagement application for production, run:

```
./gradlew -Pprod clean bootJar
```

This will concatenate and minify the client CSS and JavaScript files.
To ensure everything worked, run:

```
java -jar build/libs/*.jar
```

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.


### Packaging as war

To package your application as a war in order to deploy it to an application server, run:

```
./gradlew -Pprod -Pwar clean bootWar
```


You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

```
./gradlew bootJar -Pprod jibDockerBuild
```

Then run:

```
docker-compose -f app-docker-compose.yml up -d
```