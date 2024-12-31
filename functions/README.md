# Task Management API

## Overview

This project provides a RESTful API for managing tasks using Firebase Functions, Firestore, and Swagger for API documentation. The API includes endpoints for creating, retrieving, updating, and deleting tasks.

## Features

- **Firebase Functions**: Serverless backend powered by Firebase.
- **Firestore**: Cloud database for storing tasks.
- **Express.js**: Framework used for API routing.
- **Swagger**: API documentation generated dynamically.
- **TypeScript**: Ensures strong typing and better code maintainability.

## Requirements

- [Node.js](https://nodejs.org/) (version 16 or later)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- A Firebase project with Firestore enabled

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up Firebase:

   ```bash
   firebase login
   firebase init functions
   ```

   - Select your Firebase project.
   - Ensure Firestore is enabled in your Firebase Console.

3. Configure environment:

   - Create a `.env` file (if needed) for environment variables.

## Local Development

To run the project locally:

1. Start the Firebase emulator:

   ```bash
   firebase emulators:start
   ```

2. Access the API locally at:

   ```
   http://localhost:5001/<your-project-id>/us-central1/api
   ```

3. Access Swagger documentation:

   ```
   http://localhost:5001/<your-project-id>/us-central1/docs
   ```

## Endpoints

### Base URL

- **Local**: `http://localhost:5001/<your-project-id>/us-central1/api`

### Task Routes

| Method | Endpoint   | Description           |
| ------ | ---------- | --------------------- |
| POST   | `/`        | Create a new task     |
| GET    | `/`        | Retrieve all tasks    |
| GET    | `/:taskId` | Retrieve a task by ID |
| PUT    | `/:taskId` | Update a task by ID   |
| DELETE | `/:taskId` | Delete a task by ID   |

### User Routes

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| POST   | `/`        | Create a new user       |
| GET    | `/:email`  | Retrieve a user by email|

## Swagger Documentation

The API documentation is accessible at:

- **Local**: `http://localhost:5001/<your-project-id>/us-central1/api-docs`

The Swagger documentation provides detailed information about each endpoint, including required parameters and response structures.

## Project Structure

```
.
├── src
│   ├── application
│   │   ├── task
│   │   │   ├── create.ts
│   │   │   ├── delete.ts
│   │   │   ├── get.ts
│   │   │   └── update.ts
│   │   ├── user
│   │       ├── create.ts
│   │       └── get.ts
│   ├── configs
│   │   ├── validators
│   │   │   └── environment.ts
│   │   ├── environment.ts
│   │   └── server.ts
│   ├── domain
│   │   ├── entities
│   │   │   ├── task.ts
│   │   │   └── user.ts
│   │   └── repositories
│   │       └── base.ts
│   ├── infrastructure
│   │   ├── firebase
│   │   │   ├── firestore-task.repository.ts
│   │   │   ├── task-error.handler.ts
│   │   │   ├── firestore-user.repository.ts
│   │   │   └── user-error.handler.ts
│   ├── web
│   │   ├── routes
│   │   │   ├── tasks
│   │   │   │   ├── controller.ts
│   │   │   │   └── router.ts
│   │   │   └── users
│   │   │       ├── controller.ts
│   │   │       └── router.ts
│   │   └── server.ts
│   ├── shared
│   │   ├── error
│   │   │   └── todo.handler.ts
│   │   ├── firestore
│   │   │   └── index.ts
│   │   └── logger
│   │       ├── client.ts
│   │       └── firebase-logger.client.ts
├── .eslintrc.js
├── .gitignore
├── firebase-debug.log
├── package-lock.json
├── package.json
├── swagger.ts
├── tsconfig.dev.json
├── tsconfig.json
└── README.md
```

## Testing

### Unit Tests

Unit tests are yet to be defined.

### Integration Tests

Integration tests are yet to be defined.

## Contact

For questions or support, contact [yoher.obando.duarte@hotmail.com](mailto:yoher.obando.duarte@hotmail.com).

