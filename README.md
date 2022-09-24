# Bomberman game

Diploma project for study programme Midle front-end developer by Yandex Praktikum

Presentation ref: https://docs.google.com/presentation/d/1aq9TzsLVxcxsI6jMX7NcWGCHUgUKYvxNuZTcb-ao4mo/edit?usp=sharing

## Stack of technology utilized
* Webpack
* React
* Eslint, Prettier
* UI - Chakra
* Forms - fromik & yup
* Redux Toolkit
* API - RTK Query
* Service worker
* SSR + hmr
* Docker
* PostgresQL


## Scripts
* `docker-compose up` - for running the app with Postgres DB
* `sudo docker-compose -f docker-compose-db-only.yaml up` - run only Postgres DB (after db starting you can do development of the application or just start it separately to docker-compose - scripts `dev` or `prod`)
* `sudo docker-compose down --rmi all -v --remove-orphans
  ` - down all containers
* `sudo rm -rf node_modules/.cache` - clean webpack cache
* `dev` - start app in development mode
* `build` - building the app for production
* `lint:fix` - applying lint for all .ts, .tsx, .scss files with fixing
* `format:write` - applying Prettier tool for files .js, .ts, .tsx, .jsx, .json
