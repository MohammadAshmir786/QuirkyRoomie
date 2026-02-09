# QuirkyRoomie

A full-stack web application for managing roommate complaints and leaderboard rankings in shared living spaces.

## Project Overview

QuirkyRoomie is designed to help roommates keep track of complaints, resolve disputes fairly, and maintain a healthy living environment through a transparent leaderboard system.

## Features

- **User Authentication**: Secure login and registration system
- **Complaint Management**: Submit and track complaints against roommates
- **Leaderboard**: View rankings based on complaint history
- **Statistics**: Track complaint stats and roommate behavior
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Git** (optional, for version control)

## Project Structure

```
QuirkyRoomie/
├── backend/          # Express.js server
│   ├── src/
│   │   ├── config/   # Database configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/   # MongoDB schemas
│   │   ├── routes/   # API routes
│   │   └── utils/    # Utility functions
│   └── server.js     # Server entry point
└── frontend/         # React + Vite application
    ├── src/
    │   ├── components/   # Reusable React components
    │   ├── context/  # React context
    │   ├── pages/    # Page components
    │   └── services/ # API service
    └── vite.config.js   # Vite configuration
```

## Installation & Setup

### 1. Clone or Extract the Project

```bash
cd QuirkyRoomie
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure environment variables by creating a `.env` file in the `backend` directory:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/quirkyroomie
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

Replace the placeholder values with your actual MongoDB connection string and a secure JWT secret.

Start the backend server:

```bash
npm start
```

The server should run on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend should open on `http://localhost:5173` (or another port if 5173 is in use)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Submit a new complaint
- `GET /api/complaints/:id` - Get complaint details
- `DELETE /api/complaints/:id` - Delete a complaint

### Flat/Shared Space
- `GET /api/flat` - Get flat information
- `POST /api/flat` - Create/update flat

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard rankings

## Running the Application

### Development Mode

1. **Terminal 1 - Backend:**
```bash
cd backend
npm start
```

2. **Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser to the frontend URL displayed in the terminal.

### Production Build

For the frontend:

```bash
cd frontend
npm run build
```

This creates an optimized build in the `dist/` directory.

## Troubleshooting

- **MongoDB Connection Error**: Verify your `MONGODB_URI` in the `.env` file
- **Port Already in Use**: Change the PORT in `.env` or kill the process using the port
- **Dependencies Issues**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **CORS Issues**: Ensure the frontend URL is whitelisted in the backend

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Contributing

Feel free to submit issues or pull requests to improve the application.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the project repository or contact the development team.
