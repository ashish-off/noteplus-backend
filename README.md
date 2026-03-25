# NotePlus Backend API Documentation

This document describes the backend API for the NotePlus app.

## Overview

- Runtime: Node.js + Express + TypeScript
- Database: MongoDB (Mongoose)
- Auth: JWT stored in an HTTP-only cookie named token
- Base path:
  - Auth: /api/auth
  - Notes: /api/notes

## Tech Stack

- express
- mongoose
- jsonwebtoken
- bcrypt
- cookie-parser

## Environment Variables

Create a .env file (based on sample.env):

```env
PORT=<port_number>
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.3mrxuwx.mongodb.net/
JWT_SECRET=<your_jwt_secret_key>
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Run Backend

```bash
npm install
npm run dev
```

Build and run production:

```bash
npm run build
npm start
```

## Authentication Model

- On successful register/login, server sets cookie token.
- Cookie options:
  - httpOnly: true
  - secure: true only in production
  - sameSite: none in production, strict otherwise
  - maxAge: 15 days
- Protected routes read req.cookies.token.
- Frontend/client must send credentials (cookies) with requests.

## Data Models

### User

- name: string (required)
- email: string (required, unique, lowercase)
- password: string (required, hidden in normal queries)

### Note

- title: string (required)
- details: string (required)
- dateLabel: string (auto-generated formatted timestamp)
- userId: ObjectId reference to User (required)

## API Endpoints

All responses are JSON.

### Health/Root

#### GET /

Returns API introduction and available endpoint hints.

Success response:

```json
{
  "message": "Hi this is Ashish Saud, And this is API for my noteplus app.",
  "api_endpoints": {
    "get_all_notes": "/api/notes",
    "create_note": "/api/notes",
    "get_note_by_id": "/api/notes/:id",
    "update_note": "/api/notes/:id",
    "delete_note": "/api/notes/:id",
    "delete_all_notes": "/api/notes/delete-all"
  },
  "auth_endpoints": {
    "register": "/api/auth/register",
    "login": "/api/auth/login",
    "logout": "/api/auth/logout",
    "get_me": "/api/auth/me"
  }
}
```

### Auth Endpoints

| Method | Endpoint           | Description                           |
| ------ | ------------------ | ------------------------------------- |
| POST   | /api/auth/register | Register a new user.                  |
| POST   | /api/auth/login    | Log in with existing credentials.     |
| POST   | /api/auth/logout   | Clear the auth cookie (log out).      |
| GET    | /api/auth/me       | Get the currently authenticated user. |

### Notes Endpoints (All Protected)

All /api/notes routes require a valid auth token cookie.

| Method | Endpoint              | Description                                                      |
| ------ | --------------------- | ---------------------------------------------------------------- |
| GET    | /api/notes            | Get all notes for the authenticated user (latest updated first). |
| GET    | /api/notes/:id        | Get a single note by id for the authenticated user.              |
| POST   | /api/notes            | Create a new note for the authenticated user.                    |
| PUT    | /api/notes/:id        | Update an existing note by id for the authenticated user.        |
| DELETE | /api/notes/:id        | Delete a single note by id for the authenticated user.           |
| DELETE | /api/notes/delete-all | Delete all notes for the authenticated user.                     |

## Common Error Responses

- Unauthorized or missing cookie:

```json
{ "message": "Unauthorized" }
```

- Invalid or expired token:

```json
{ "message": "Invalid token" }
```

## CORS and Cookies for Frontend

Backend allows credentials and uses FRONTEND_URL as allowed origin.

Example fetch:

```js
fetch("http://localhost:3000/api/notes", {
  method: "GET",
  credentials: "include",
});
```

## Author

- Name: Ashish Saud
- [LinkedIn](https://www.linkedin.com/in/ashish-saud-55ab57294)
- [GitHub](https://github.com/ashish-off)
