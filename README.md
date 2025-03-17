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

To help beginners get started with your Hotel Management System project, I'll provide a step-by-step guide on setting up the development environment, including the installation of Visual Studio Code, Git, and Node.js. This guide will also cover cloning the repository and running the project locally.

### Getting Started Guide for Beginners

#### Prerequisites

1. **Visual Studio Code (VS Code)**
   - Download and install VS Code from the [official website](https://code.visualstudio.com/).
   - Follow the installation instructions for your operating system.

2. **Git**
   - Download and install Git from the [official website](https://git-scm.com/).
   - Follow the installation instructions for your operating system.
   - After installation, open a terminal or command prompt and run `git --version` to verify the installation.

3. **Node.js**
   - Download and install Node.js from the [official website](https://nodejs.org/).
   - Choose the LTS (Long Term Support) version for stability.
   - After installation, open a terminal or command prompt and run `node -v` and `npm -v` to verify the installation.

#### Project Setup

1. **Clone the Repository**
   - Open a terminal or command prompt.
   - Navigate to the directory where you want to clone the project.
   - Run the following command to clone the repository:
     ```bash
     git clone https://github.com/Raghulkannan005/hotel-management.git
     cd hotel-management
     ```

2. **Backend Setup**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory with the necessary environment variables. You can use the `.env.example` file as a reference:
     ```plaintext
     PORT=3000
     DATABASE_URL=your_mongodb_url
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**
   - Open a new terminal or command prompt.
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the frontend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend` directory if needed. You can use the `.env.example` file as a reference:
     ```plaintext
     VITE_API_URL=http://localhost:3000/api
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

#### Running the Project

- Once both the backend and frontend servers are running, open a web browser and navigate to `http://localhost:5173` to view the application.

#### Additional Tips

- **VS Code Extensions**: Consider installing useful extensions like Prettier for code formatting, ESLint for linting, and GitLens for enhanced Git capabilities.
- **MongoDB**: Ensure you have access to a MongoDB instance. You can use a local installation or a cloud service like MongoDB Atlas.

This guide should help beginners set up and run the Hotel Management System project locally. If you have any questions or encounter issues, feel free to ask for further assistance!

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
