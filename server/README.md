# GoGoCash Server Side

This is the backend for the affiliate management platform, built with Node.js and Express.js. It provides a RESTful API for user authentication, product data, and conversion reports.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Unit Testing](#unit-testing)

---

## Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens).
- **Protected Routes**: Middleware to protect API endpoints, ensuring only authenticated users can access them.
- **Data Management**: Handles product feed and conversion report data.
- **RESTful API**: A well-structured API for client-side consumption.

---

## Technologies

- **Backend Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB (or specify your database, e.g., PostgreSQL, MySQL)
- **Object Data Modeling**: Mongoose (if using MongoDB)
- **Authentication**: `jsonwebtoken`, `bcryptjs`
- **Environment Variables**: `dotenv`
- **Testing**: Jest, Supertest

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd [your-server-folder]
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env` file in the project root and add your environment variables.

    ```
    # Example .env file
    PORT=3001
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=a_very_secret_key_for_jwt
    ```

### Running the Server

1.  To start the server in development mode (with live reloading):
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  To start the server in production mode:
    ```bash
    npm start
    # or
    yarn start
    ```

The server will run on `http://localhost:[PORT]`.

---

## Project Structure

├── src/
│   ├── api/             # API routes
│   │   └── v1/
│   ├── config/          # Configuration files
│   ├── controllers/     # Business logic for routes
│   ├── middlewares/     # Express middleware (e.g., auth, error handling)
│   ├── models/          # Mongoose models for data schemas
│   ├── routes/          # Express route definitions
│   ├── services/        # Service layer for data operations
│   └── index.js         # Main server file
├── .env                 # Environment variables
├── package.json
└── README.md

---

## API Endpoints

| Endpoint                      | Method | Description                               | Authentication |
| ----------------------------- | ------ | ----------------------------------------- | -------------- |
| `/api/v1/auth/signup`         | `POST`   | Creates a new user account.               | No             |
| `/api/v1/auth/login`          | `POST`   | Authenticates a user and returns a JWT.   | No             |
| `/api/v1/users/profile`       | `GET`    | Fetches the authenticated user's profile. | Yes            |
| `/api/v1/products`            | `GET`    | Fetches the list of products.             | Yes            |
| `/api/v1/conversions`         | `GET`    | Fetches the conversion report.            | Yes            |

---

## Unit Testing

The project uses **Jest** and **Supertest** for API endpoint testing.

To run all test suites:

```bash
npm test
# or
yarn test