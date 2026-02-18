# QuirkyRoomie

QuirkyRoomie is a full-stack MERN app for managing flatmate conflicts through complaint tracking, voting, leaderboards, and flat-level stats.

## Why QuirkyRoomie?

Shared living gets messy. QuirkyRoomie gives everyone a transparent system to:

- log household complaints,
- vote on issues fairly,
- resolve conflicts with accountability,
- and track karma on a leaderboard.

## Core Features

- JWT-based authentication (register, login, current user)
- Complaint lifecycle (create, list, view, vote, resolve)
- Trending complaints feed
- Leaderboard views (top karma and most complained users)
- Flat analytics (members and statistics)
- Responsive React UI with protected routes

## Tech Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- express-validator

### Frontend

- React 19 + Vite
- React Router 7
- Axios
- Tailwind CSS 4

## Monorepo Structure

```text
QuirkyRoomie/
├─ backend/
│  ├─ server.js
│  └─ src/
│     ├─ config/
│     ├─ controllers/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     └─ utils/
├─ frontend/
│  ├─ index.html
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ context/
│     ├─ pages/
│     ├─ services/
│     └─ styles/
└─ README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or Atlas)

## Quick Start

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Configure backend environment

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/quirkyroomie
JWT_SECRET=replace_with_a_long_random_secret
```

### 3) Run in development

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

Open the frontend URL shown by Vite (typically `http://localhost:5173`).

## Scripts

### Backend (`backend/package.json`)

- `npm run dev` — start API with nodemon
- `npm start` — start API with Node

### Frontend (`frontend/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview production build locally

## API Overview

Base URL: `http://localhost:5000/api`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)

### Complaints

- `POST /complaints` (protected)
- `GET /complaints` (protected)
- `GET /complaints/trending` (protected)
- `GET /complaints/:id` (protected)
- `POST /complaints/:id/vote` (protected)
- `PUT /complaints/:id/resolve` (protected)

### Leaderboard

- `GET /leaderboard` (protected)
- `GET /leaderboard/complaints` (protected)

### Flat

- `GET /flat/stats` (protected)
- `GET /flat/members` (protected)

> Protected routes require `Authorization: Bearer <token>`.

## Build for Production

```bash
cd frontend
npm run build
```

The production output is generated in `frontend/dist`.

## Troubleshooting

- If MongoDB fails to connect, verify `MONGODB_URI` and network access rules (Atlas IP allowlist).
- If auth fails unexpectedly, verify `JWT_SECRET` exists and backend was restarted after `.env` changes.
- If ports are busy, change backend `PORT` or let Vite auto-switch frontend port.

## Notes

- Backend and frontend each have their own README files for deeper, layer-specific details.
- This root README is the quickest end-to-end setup guide.
