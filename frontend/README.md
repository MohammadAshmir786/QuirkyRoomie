# QuirkyRoomie Frontend

React + Vite client for the QuirkyRoomie flatmate conflict management platform.

## Overview

This app handles user authentication, complaint workflows, leaderboard screens, and flat statistics dashboards with a responsive UI.

### What It Includes

- Authentication flow (register/login/logout)
- Protected app routes
- Complaint list, filing, voting, and resolve actions
- Leaderboard views
- Flat stats and members screen
- Global branding (custom logo + favicon)

## Stack

- React 19
- Vite 6
- React Router 7
- Axios
- Tailwind CSS 4

## Folder Layout

```text
frontend/
├─ index.html
├─ package.json
├─ public/
└─ src/
	├─ assets/
	├─ components/
	├─ context/
	├─ pages/
	├─ services/
	├─ styles/
	├─ App.jsx
	└─ main.jsx
```

## Configuration

You can configure the API base URL with an env variable.

Create frontend/.env (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

If omitted, the app defaults to:

```text
http://localhost:5000/api
```

## Run Locally

Install dependencies:

```bash
cd frontend
npm install
```

Start dev server:

```bash
npm run dev
```

Vite will print the running URL (typically http://localhost:5173).

## NPM Scripts

- npm run dev — start development server
- npm run build — create production build in dist
- npm run preview — preview production build locally

## API Layer

The Axios client is configured in src/services/api.js and includes:

- Base URL from VITE_API_URL or localhost fallback
- Request interceptor to attach Bearer token from localStorage
- Response interceptor to handle 401 by clearing token and dispatching auth:unauthorized

Domain-level service methods are in src/services/index.js:

- authService
- complaintService
- leaderboardService
- flatService

## Main Pages

- Home
- Login
- Register
- Complaints
- Leaderboard
- Stats

## UI Notes

- Tailwind + global CSS utilities for gradients, cards, and form styles
- Responsive navbar and mobile menu behavior
- Shared AuthLayout for login/register visual consistency

## Troubleshooting

- Blank data states usually indicate backend unavailable or token invalid
- Verify backend is running on expected URL and CORS is enabled
- If auth loop happens, clear localStorage token and login again

## License

ISC
