# Zorp Hotel Management System

A modern hotel management system with both user and admin interfaces, allowing users to browse rooms, make bookings, and manage their reservations.

## Features

### User Features
- Browse available rooms
- Create user accounts and login
- Book rooms with date selection
- View booking history
- Cancel bookings
- Update profile information

### Admin Features
- Manage rooms (add, edit, delete)
- Manage bookings
- Manage users
- View reports and statistics

## Tech Stack

### Frontend
- React with React Router for navigation
- TailwindCSS for styling
- Axios for API requests
- React Toastify for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose for data storage
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
├── backend/             # Backend code
│   ├── src/
│   │   ├── controllers/ # Controllers for business logic
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic services
│   │   ├── middlewares/ # Middleware functions
│   │   ├── utils/       # Utility functions
│   │   ├── app.js       # Express app setup
│   │   └── server.js    # Server entry point
│   └── package.json     # Backend dependencies
│
└── frontend/            # Frontend code
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── services/    # API service functions
    │   ├── App.jsx      # Main app component
    │   └── main.jsx     # Application entry point
    └── package.json     # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hotel-management
```

2. Install backend dependencies and start the server
```bash
cd backend
npm install
# Create a .env file with necessary credentials (see .env.example)
npm run dev
```

3. Install frontend dependencies and start the development server
```bash
cd frontend
npm install
# Create a .env file if needed
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/hotel-management
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/profile` - Get user profile

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/search` - Search rooms with filters

### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/history` - Get user's booking history
- `DELETE /api/bookings/:id` - Cancel a booking

### Admin Routes
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update a user
- `DELETE /api/admin/users/:id` - Delete a user
- `POST /api/admin/rooms` - Create a room
- `PUT /api/admin/rooms/:id` - Update a room
- `DELETE /api/admin/rooms/:id` - Delete a room
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id` - Update a booking
- `DELETE /api/admin/bookings/:id` - Delete a booking

## Screenshots

(Add screenshots of key pages here)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

(Add contributors here)
