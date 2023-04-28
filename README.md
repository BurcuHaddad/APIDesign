
# CRM Project

This project serves as a comprehensive customer relations management system tailored for a hypothetical sales-focused company. Built with Node.js and Express, this project employs MongoDB as its database management system, with Mongoose serving as the Object Data Modeling (ODM) tool of choice and utilizes JSON Web Tokens (JWT) for authorization purposes. The project uses the Winston logger to log errors and track activity. This project was developed completely from scratch, with the exception of the libraries used to facilitate certain functionalities.


## Postman

 - [Endpoint Examples & Workspace](https://www.postman.com/aerospace-physicist-57865121/workspace/crm)


## Features

- Option to implement three distinct user roles with different authorizations: admin, supervisor, and seller.

- Sign up verification via Email.

- Ability to create, update and delete customers.

- Notifications can be sent via email, WhatsApp, or SMS using Twilio from the respective seller associated with each customer.
- System allows for both the sending of bulk messages and the targeting of a selected range of customers to receive messages.


## Folder Reference

|     Folder        | Description                                                             |
| ----------------- | ------------------------------------------------------------------ |
| Controllers |Implements the business logic. Handles data processing and response generation.|
| Models| User and Customer schema.|
| Routes| Defines the endpoints of the application's API. |
| Utils | Utility functions that are used throughout the application.|


## Details

- Only the admin and supervisor roles have access to view all customers in the database.
- Sellers are limited to accessing and notifying their respective customers only.
- Access to create, update, or delete a customer is restricted to authenticated users only.

