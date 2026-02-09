# QuirkyRoomie Backend API

A MERN stack application for managing flatmate conflicts through complaint logging, voting, and gamification.

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Atlas or Local)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quirkyroomie
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

5. **Start the server:**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will run on `http://localhost:5000`

---

## API Endpoints

### Authentication Routes

#### Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new flatmate
- **Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "flatCode": "FLAT123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "flatCode": "FLAT123"
  }
}
```

#### Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Login and receive JWT token
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "flatCode": "FLAT123",
    "karma": 45
  }
}
```

#### Get Current User
- **Endpoint:** `GET /api/auth/me`
- **Description:** Get authenticated user details
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "flatCode": "FLAT123",
    "karma": 45,
    "complaintsFiled": [...]
  }
}
```

---

### Complaint Routes

#### File a Complaint
- **Endpoint:** `POST /api/complaints`
- **Description:** File a new complaint about household issues
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Body:**
```json
{
  "title": "Loud Music at Night",
  "description": "Someone was playing loud music at 2 AM",
  "complaintType": "Noise",
  "severity": "Major"
}
```
- **Response:**
```json
{
  "success": true,
  "message": "Complaint filed successfully",
  "complaint": {
    "id": "complaint_id",
    "title": "Loud Music at Night",
    "complaintType": "Noise",
    "severity": "Major",
    "status": "Active",
    "votes": {
      "upvotes": 0,
      "downvotes": 0
    }
  }
}
```

#### Get All Complaints
- **Endpoint:** `GET /api/complaints?status=Active`
- **Description:** List all complaints for the user's flat
- **Query Parameters:**
  - `status` (optional): `Active`, `Resolved`, or `Archived` (default: `Active`)
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "count": 5,
  "complaints": [...]
}
```

#### Get Single Complaint
- **Endpoint:** `GET /api/complaints/:id`
- **Description:** Get details of a specific complaint
- **Headers:**
```
Authorization: Bearer <jwt_token>
```

#### Vote on Complaint
- **Endpoint:** `POST /api/complaints/:id/vote`
- **Description:** Upvote or downvote a complaint
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Body:**
```json
{
  "voteType": "upvote"
}
```
- **Note:** When a complaint reaches 10+ upvotes, an automated punishment is generated
- **Response:**
```json
{
  "success": true,
  "message": "Vote recorded",
  "complaint": {
    "votes": {
      "upvotes": 10,
      "downvotes": 2
    },
    "suggestedPunishment": "Didn't clean the dishes? You're making chai for everyone for a week."
  }
}
```

#### Resolve Complaint
- **Endpoint:** `PUT /api/complaints/:id/resolve`
- **Description:** Mark a complaint as resolved (awards 10 karma points)
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "message": "Complaint resolved successfully",
  "complaint": {
    "status": "Resolved",
    "resolvedBy": "user_id",
    "resolvedAt": "2026-02-09T10:30:00Z"
  }
}
```

#### Get Trending Complaints
- **Endpoint:** `GET /api/complaints/trending`
- **Description:** Get top 10 most upvoted active complaints
- **Headers:**
```
Authorization: Bearer <jwt_token>
```

---

### Leaderboard Routes

#### Get Leaderboard (by Karma)
- **Endpoint:** `GET /api/leaderboard`
- **Description:** Get top 20 users ranked by karma points
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "karma": 120
    }
  ]
}
```

#### Get Most Complained Users
- **Endpoint:** `GET /api/leaderboard/complaints`
- **Description:** Get users with most complaints against them
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "complaints": [
    {
      "username": "jane_doe",
      "email": "jane@example.com",
      "complaintCount": 5,
      "totalUpvotes": 15
    }
  ]
}
```

---

### Flat Statistics Routes

#### Get Flat Statistics
- **Endpoint:** `GET /api/flat/stats`
- **Description:** Get overall statistics for the flat
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "stats": {
    "flatName": "Flat-FLAT123",
    "memberCount": 4,
    "totalComplaints": 12,
    "activeComplaints": 5,
    "resolvedComplaints": 6,
    "archivedComplaints": 1,
    "complaintsByType": {
      "Noise": 4,
      "Cleanliness": 5,
      "Bills": 2,
      "Pets": 1
    }
  }
}
```

#### Get Flat Members
- **Endpoint:** `GET /api/flat/members`
- **Description:** Get all members of the user's flat
- **Headers:**
```
Authorization: Bearer <jwt_token>
```
- **Response:**
```json
{
  "success": true,
  "members": [
    {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "karma": 45
    }
  ]
}
```

---

## Database Schema

### User Schema
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (hashed),
  flatCode: String (required),
  karma: Number (default: 0),
  complaintsFiled: [ObjectId],
  complaintsBadges: {
    count: Number,
    monthlyBadge: Boolean
  },
  timestamps: true
}
```

### Complaint Schema
```javascript
{
  title: String,
  description: String,
  complaintType: String (enum: Noise, Cleanliness, Bills, Pets, Other),
  severity: String (enum: Mild, Annoying, Major, Nuclear),
  filedBy: ObjectId (User),
  flatCode: String,
  votes: {
    upvotes: Number,
    downvotes: Number,
    userVotes: [{userId, voteType}]
  },
  status: String (enum: Active, Resolved, Archived),
  suggestedPunishment: String,
  resolvedBy: ObjectId (User),
  resolvedAt: Date,
  timestamps: true
}
```

### Flat Schema
```javascript
{
  flatCode: String (unique),
  flatName: String,
  members: [ObjectId],
  stats: {
    totalComplaints: Number,
    resolvedComplaints: Number,
    complaintsByType: Map
  },
  timestamps: true
}
```

---

## Features Implemented

✅ User Authentication with JWT
✅ Complaint Filing System
✅ Voting System (Upvote/Downvote)
✅ Karma Points System
✅ Automated Punishment Generation (10+ upvotes)
✅ Leaderboard (by Karma & Complaints)
✅ Flat Statistics
✅ Status Management (Active, Resolved, Archived)
✅ Error Handling Middleware

---

## Development Notes

- All API endpoints require JWT authentication (except login/register)
- JWT token should be passed in Authorization header: `Bearer <token>`
- Passwords are hashed using bcryptjs before storage
- Karma points are awarded for resolving complaints (10 points per resolution)
- Punishments are randomly selected when a complaint reaches 10+ upvotes
- Different complaint types help categorize household issues

---

## Future Enhancements

- Auto-archive downvoted complaints (after 3 days)
- Monthly "Best Flatmate" badge system
- Email notifications for new complaints
- Complaint comments/discussions
- Advanced filtering and search
- Scheduled jobs for archival automation

---

## License

ISC
