# Politoco [![Coverage Status](https://coveralls.io/repos/github/ngabopatrick/Politico/badge.svg?branch=develop)](https://coveralls.io/github/ngabopatrick/Politico?branch=develop)

[![Build Status](https://travis-ci.com/ngabopatrick/Politico.svg?branch=develop)](https://travis-ci.com/ngabopatrick/Politico)

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
# Technologies used

# API-Endpoints
JSON Object is returned for every API endpoint, structure of return JSON Object:
```
- Post / office
{

"status": 201,
"message": "Office succesfully created",
"data": {
    "id": 1,
    "officeName": "Presidency"
    "officeType": "Federal", 
    }
}
```