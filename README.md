# Config

## Docker

**The project use Mongo 5.0.0 docker image**

Do the next command to run the container

```
docker-compose up -d
```
**-d is for detached containers**
___
## Declare **.env variables**

In order to complete the app set up, you need to declare the environment variables (.env file)

Use the **.env.template** file as a guide about how to define all the necessary variables
___
## To populate the database use the following endpoint:

```
http://localhost:3000/api/seed
```