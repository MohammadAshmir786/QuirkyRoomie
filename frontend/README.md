# QuirkyRoomie Frontend

A React + Vite frontend for the QuirkyRoomie flatmate conflict management system.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env.local` file:**
```bash
cp .env.example .env.local
```

4. **Configure environment variables in `.env.local`:**
```
VITE_API_URL=http://localhost:5000/api
```

5. **Start the development server:**
```bash
npm run dev
```

The application will run on `http://localhost:3000`

---

## Project Structure

```
frontend/
├── src/
│   ├── components/       (Reusable UI components)
│   ├── pages/           (Page components)
│   ├── context/         (React Context for state management)
│   ├── services/        (API service layer)
│   ├── styles/          (Global CSS)
│   ├── App.jsx          (Main app component)
│   └── main.jsx         (Entry point)
├── index.html           (HTML template)
├── vite.config.js       (Vite configuration)
├── package.json         (Dependencies)
└── README.md
```

---

## Features

✅ User Authentication (Login/Register)
✅ File and Manage Complaints
✅ Voting System (Upvote/Downvote)
✅ Automatic Punishment Generation
✅ Leaderboard (by Karma & Most Complained)
✅ Flat Statistics & Analytics
✅ Protected Routes
✅ Real-time Vote Updates
✅ Complaint Status Tracking
✅ Responsive Design

---

## Key Pages

### Home
Landing page with feature overview and call-to-action buttons.

### Login / Register
User authentication pages with form validation.

### Complaints
Main page to view, file, and vote on complaints:
- Filter by status (Active, Resolved, Archived)
- File new complaints with type and severity
- Upvote/downvote complaints
- Resolve complaints (earn karma)
- View suggested punishments

### Leaderboard
Two tabs:
1. **Top Flatmates** - Ranked by karma points
2. **Most Complained** - Users with most complaints against them

### Stats
Displays flat-wide statistics:
- Member count
- Total complaints breakdown
- Complaints by type (with progress bars)
- List of all members with karma scores

---

## Components

### Navbar
Navigation bar with links and user info.

### ProtectedRoute
Route wrapper that requires authentication.

### ComplaintCard
Reusable complaint display with voting buttons.

---

## API Integration

The app uses Axios for API calls with:
- Automatic JWT token attachment
- Error handling and redirects
- Centralized base URL configuration

All API calls are made through the service layer in `src/services/index.js`.

---

## Styling

Uses a custom CSS framework with:
- CSS variables for theming
- Responsive grid system
- Utility classes (button, badge, alert, etc.)
- Mobile-first design

---

## Development

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Styling:** CSS (custom framework)

---

## Future Enhancements

- Dark mode toggle
- Real-time notifications
- Comment system on complaints
- Advanced filtering & search
- Complaint history
- User profiles

---

## License

ISC
