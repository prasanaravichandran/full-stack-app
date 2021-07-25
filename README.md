# full-stack-app

A ReactJS application to keep track of the expenses and shows us the daily metrics of the expense (total credit or debit per day) with NodeJS GraphQL Server.

**Technology Used**:
1. Frontend - ReactJS (Hooks, GraphQL Client)
2. API Type - GraphQL
3. Backend  - NodeJS (GraphQL Server)
4. Database - MongoDB
5. Authentication - JWT
6. Deployment - Docker in Heroku

**Pages**
1. Login
    -User can login into the application. The API request will validate with the Database and create a **Token** to access that throught the application for authentication.

2. Expense
    -User can able to add the expense along with **Description**. 
    -This page will show the **Total amount debited or credited** of all the expenses we added.
    -**Bar Chart** is used to showcase the daily expense for both debit and credit.
    -Following **CRUD Operations** we can do in this page:
        i. ***Create*** new expense
       ii. ***Read*** expenses list
      iii. ***Update*** existing expense
       iv. ***Delete*** expense

3. Logout
    -User can logout from the application and have to log in to use the application.

*This application is dockerized and deployed in Heroku.*




