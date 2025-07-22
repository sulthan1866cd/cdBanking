# CD Banking

- fullstack app with node.js and html, css, js
- users can create account and manage and deposit in their accounts(savings ,current, credit)
- there should be atleast two accounts to make a transaction
- all transactions can be viewed in statement table

## Tech stack
- frontend: html, css, js
- backend: node.js
- database: postgres

## Frontend
- frontend will be available in ` views/index.html ` use vscode to open views folder seperately and use live server extention to view page.

## Backend 
- run `npm i` or `yarn` to install package dependencies
- run `npm run dev` or `yarn run dev` to start backend 

## Database
### create database schema accordingly
#### Users
- customer_id - PK
- password
- name

#### Savings
- savings_acc_no - PK
- userCustomerId - FK
- balance
- branch
- ifsc

#### Current
- current_acc_no - PK
- userCustomerId - FK
- balance
- branch
- ifsc

#### Credit 
- credit_card_no - PK
- userCustomerId - FK
- type
- balence

#### Statement
- transaction_no - PK
- userCustomerId - FK
- account
- description
- ammount
- closing_balence

## dotenv
- create a .env file on root folder and add the following parameters
- FRONT_END_URL=url on which frontend is running
- PORT=port on which backend should listen to (3000 is which frontend sends request so you can configure frontend code accordingly)

- DB_NAME
- DB_USERNAME
- DB_PASSWORD
- DB_HOST
