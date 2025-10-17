# Full Stack CRUD Application

A simple full-stack application with structured Golang backend, React frontend, and LogTo authentication.

## Features

- CRUD operations for user management
- Clean Go backend with separated packages
- Modern React frontend with TypeScript
- LogTo authentication integration
- Responsive design

## Prerequisites

- Go 1.19+
- Node.js 16+
- MySQL 8.0

## Setup Instructions

### 1. Database Setup

Install MySQL locally and create a database:

```sql
CREATE DATABASE crud_app;
```

Make sure MySQL is running on `localhost:3306` with:
- Database: `crud_app`
- Username: `root`
- Password: `password`

Or update the connection string in `backend/database/connection.go`

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
go mod tidy
```

3. Run the backend server:
```bash
go run main.go
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure LogTo (see LogTo Configuration section below)

4. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## LogTo Configuration

1. Sign up for a LogTo account at [https://logto.io](https://logto.io)
2. Create a new application in your LogTo dashboard
3. Update the configuration in `frontend/src/App.tsx`:

```typescript
const config = {
  endpoint: 'https://your-logto-endpoint.logto.app', // Your LogTo endpoint
  appId: 'your-app-id', // Your LogTo app ID
  resources: ['https://your-api-resource'], // Your API resource (optional)
};
```

4. Configure redirect URIs in LogTo dashboard:
   - Sign-in redirect URI: `http://localhost:3000/callback`
   - Post sign-out redirect URI: `http://localhost:3000`

**For Development/Testing:** The app will show a sign-in button, but without proper LogTo configuration, authentication won't work. The UI is ready for LogTo integration.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get a specific user
- `PUT /api/users/{id}` - Update a user
- `DELETE /api/users/{id}` - Delete a user

## Project Structure

```
fullstack-crud-app/
├── backend/
│   ├── main.go
│   ├── models/
│   │   └── user.go
│   ├── handlers/
│   │   └── user.go
│   ├── database/
│   │   └── connection.go
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserManager.tsx
│   │   │   └── Callback.tsx
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
└── README.md
```

## Usage

1. Start the MySQL database using Docker Compose
2. Start the backend server (`go run main.go` in backend directory)
3. Start the frontend development server (`npm start` in frontend directory)
4. Open your browser to `http://localhost:3000`
5. Sign in using LogTo authentication
6. Manage users through the CRUD interface

## Technologies Used

### Backend
- **Go** - Programming language with clean package structure
- **Gorilla Mux** - HTTP router and URL matcher
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **LogTo React SDK** - Authentication
- **Axios** - HTTP client
- **React Router** - Client-side routing

### Database
- **MySQL** - Relational database

## Backend Structure

- `models/` - Data structures
- `handlers/` - HTTP request handlers
- `database/` - Database connection and setup
- `main.go` - Application entry point

### Frontend Development
- Built with Create React App and TypeScript template
- Uses functional components with React Hooks
- Responsive design with CSS Grid and Flexbox

## Security Notes

- LogTo handles authentication and authorization
- CORS is properly configured for development
- SQL queries use parameterized statements to prevent injection
- For production, update CORS origins and use environment variables for sensitive data

## License

MIT License