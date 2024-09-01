# Tuition Searching Platform

## Overview

The **Tuition Searching Platform** is a comprehensive web application designed to connect students with teachers in Pakistan. The platform allows teachers to offer tutoring services, while students can search for, hire, and engage teachers based on various criteria such as subjects, grades, and location. The application supports both online and physical tutoring sessions, and includes advanced features like chat functionality, contract management, notifications, and integration with Gemini LLM for a chatbot to assist users.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and signup with JWT-based authentication.
- **Teacher and Student Profiles**: Manage detailed profiles for both students and teachers.
- **Search Functionality**: Search for teachers based on subjects, grades, availability, and location.
- **Contract Management**: Create and manage contracts between students and teachers.
- **Chat System**: Real-time chat between students and teachers.
- **Notifications**: Notification system for contract updates, chat messages, and more.
- **LLM Integration**: Gemini LLM-powered chatbot for assisting users on the platform.

## Tech Stack

- **Frontend**: Next.js, React, Redux, Tailwind CSS (optional)
- **Backend**: Next.js API routes, Node.js, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **LLM Integration**: Gemini LLM
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules, Tailwind CSS (optional)
- **Testing**: Jest, React Testing Library, Postman (for API testing)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)
- [PostgreSQL](https://www.postgresql.org/) (or another relational database)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/tuition-searching-platform.git
   cd tuition-searching-platform
   ```
2. **Install Dependencies**
   ```bash
   npm install

   ```


3. **Set Up Environment Variables**

Create a .env.local file in the root of your project with the following content:

  ```bash
  DATABASE_URL=postgres://username:password@localhost:5432/your_database
  JWT_SECRET=your_jwt_secret_key
  GEMINI_SECRET_KEY=your_gemini_secret_key
  NODE_ENV=development
  NEXT_PUBLIC_API_URL=http://localhost:3000/api
  ```
4. Start the server

```bash
npm run dev
```
## API Documentation

### API endpoints are organized under the /api/ directory. Here’s a quick overview:

### Authentication: /api/auth/

POST /api/auth/login: Authenticate a user and return a JWT.
POST /api/auth/signup: Register a new user.

### Teachers: /api/teachers/

GET /api/teachers: Retrieve a list of teachers.
GET /api/teachers/[id]: Retrieve a specific teacher's details.

### Students: /api/students/

GET /api/students: Retrieve a list of students.
GET /api/students/[id]: Retrieve a specific student's details.

### Contracts: /api/contracts/

POST /api/contracts: Create a new contract.
GET /api/contracts/[id]: Retrieve contract details.

### Chat: /api/chat/

POST /api/chat: Send a chat message.
GET /api/chat/[id]: Retrieve chat history.

Refer to the docs/api-documentation.md file for detailed API documentation.

## Contributing
We welcome contributions to the Tuition Searching Platform! Please follow these steps to contribute:

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

