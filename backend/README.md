# QuirkyRoomie Backend

Express + MongoDB API for complaint-driven flatmate conflict management.

## Overview

The backend powers authentication, complaint workflows, leaderboard ranking, and flat analytics.

### Key Capabilities

- JWT authentication with protected routes
- Complaint filing, voting, and resolution
- Karma scoring (+10 when resolving complaints)
- Automatic punishment suggestion when upvotes reach 10+
- Flat-specific stats and member insights

## Stack

- Node.js
- Express
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- express-validator

## Project Layout

```text
backend/
├─ server.js
├─ package.json
└─ src/
   ├─ config/
   ├─ controllers/
   ├─ middleware/
   ├─ models/
   ├─ routes/
   └─ utils/
```

## Environment Variables

Create a file at backend/.env:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/quirkyroomie
JWT_SECRET=replace_with_a_long_random_secret
```

## Run Locally

Install dependencies:

```bash
cd backend
npm install
```

Start in development mode:

```bash
npm run dev
```

Start in production mode:

```bash
npm start
```

API base URL:

```text
http://localhost:5000/api
```

## Authentication

Protected endpoints require:

```http
Authorization: Bearer <token>
```

Token is returned by register/login endpoints.

## API Routes

### Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Complaints

- POST /api/complaints
- GET /api/complaints
- GET /api/complaints/trending
- GET /api/complaints/:id
- POST /api/complaints/:id/vote
- PUT /api/complaints/:id/resolve

### Leaderboard

- GET /api/leaderboard
- GET /api/leaderboard/complaints

### Flat

- GET /api/flat/stats
- GET /api/flat/members

## Complaint Rules

- Required fields for filing: title, description, complaintType, severity
- Votes support: upvote, downvote
- User can change their vote; previous vote is replaced
- At 10+ upvotes, a punishment suggestion is generated
- Resolving a complaint awards 10 karma points to resolver

## Common Status Codes

- 200: success
- 201: resource created
- 400: validation/input error
- 401: missing/invalid token
- 404: resource not found
- 500: server error

## NPM Scripts

- npm run dev — run with nodemon
- npm start — run with node

## Troubleshooting

- MongoDB connection issues: verify MONGODB_URI and Atlas network allowlist
- 401 errors: check Authorization header format and token freshness
- Port conflict: change PORT in .env

## License

ISC
