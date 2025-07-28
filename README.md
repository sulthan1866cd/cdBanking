# CD Banking

- fullstack app with node.js and html, css, js
- users can create account and manage and deposit in their accounts(savings ,current, credit)
- there should be atleast two accounts to make a transaction
- all transactions can be viewed in statement table

## Table of contents

- [Tech stack](#tech-stack)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [dotenv](#dotenv)

## Tech stack

- frontend: html, css, js
- backend: node.js ( v22.17.0 )
- database: postgres

## Frontend

- frontend will be available in `views/index.html` use vscode to open views folder seperately and use live server extention to view page.

## Backend

Yarn is used in this project to manage our packages.
- version 1.22.22
```shell
# check if yarn has been installed
yarn -v
# or install yarn with npm
npm i yarn -g
# install package dependencies
yarn
#start backend
yarn dev
```

## Database

postgres database is used for storing data

### create database schema accordingly

#### Users

- customer_id - PK
- password
- name
- createdAt
- updatedAt

#### Savings

- savings_acc_no - PK
- userCustomerId - FK
- balance
- branch
- ifsc
- createdAt
- updatedAt

#### Current

- current_acc_no - PK
- userCustomerId - FK
- balance
- branch
- ifsc
- createdAt
- updatedAt

#### Credit

- credit_card_no - PK
- userCustomerId - FK
- type
- balence
- createdAt
- updatedAt

#### Statement

- transaction_no - PK
- userCustomerId - FK
- account
- description
- ammount
- closing_balence
- createdAt
- updatedAt

## dotenv

create a .env file on root folder and add the following parameters

- FRONT_END_URL=url on which frontend is running
- PORT=port on which backend should listen to (3000 is which frontend sends request so you can configure frontend code accordingly)
- DB_NAME
- DB_USERNAME
- DB_PASSWORD
- DB_HOST

## API Endpoints

- api endpoint docs are available at `/api/v1/api-docs/`
