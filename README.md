# Politico [![Coverage Status](https://coveralls.io/repos/github/ngabopatrick/Politico/badge.svg?branch=develop)](https://coveralls.io/github/ngabopatrick/Politico?branch=develop) [![Build Status](https://travis-ci.com/ngabopatrick/Politico.svg?branch=develop)](https://travis-ci.com/ngabopatrick/Politico)

- Politico is a platform for the politicians and citizens. It helps citizens give mandates to politicians running for different political offices (https://api-v1-politico.herokuapp.com/)
# Getting started
- Install dependencies
```
npm install
```
- Starting the development server
```
 npm run dev
 ```
 - Run tests

 ```
  npm run tests
  ```
# Dependancies
```
Nodejs Runtime encviroment that helps to run javascript both on th server and berouese
```
```
Express NodeJS framework used for making the back-end.
```
Joi and Morgan API request body error validation and HTTP Request logger respectively.
# Heroku
 ```
 visit link: https://api-v1-politico.com
 ```
# API-Endpoints

JSON Object is returned for every API endpoint, structure of return JSON Object:
```
POST /api/v1/offices Creating a political office.

GET /api/v1/offices Retreiving all political offices.

GET /api/v1/offices/<id> Getting a political office for a specific id.

POST /api/v1/parties Create a political party.

GET /api/v1/parties Get all political parties.

GET /api/v1/parties/<id> Get a specific political party.

PATCH /api/v1/parties/<id>/name Edit a specific political party.

DELETE /api/v1/parties/<id> Delete a particular party.``

```
# github pages

```
 https://ngabopatrick.github.io/Politico/UI/html
 ```
