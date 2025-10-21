# Server - Node.js + Express

This directory contains the backend API server built with Node.js and Express.

## Tech Stack

- **Node.js** - Runtime environment
- **Express 4.21** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

## Structure

- `routes/` - API route definitions
  - `auth.js` - Authentication routes (register, login)
  - `todos.js` - Todo list management
  - `forum.js` - Forum topics and posts
  - `dashboard.js` - Dashboard analytics for managers
- `controllers/` - Request handlers and business logic
- `models/` - Database models and schemas
  - `User.js` - User model with roles
  - `Todo.js` - Todo item model
  - `Topic.js` - Forum topic model
  - `Post.js` - Forum post model
- `middleware/` - Custom middleware functions
  - `auth.js` - JWT authentication and role authorization
- `validators/` - Input validation rules
  - `authValidator.js` - Email and password validation
- `services/` - Business logic services
- `utils/` - Utility functions
- `config/` - Configuration files

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new employee (staff email required)
- `POST /login` - Login with staff email
- `POST /logout` - Logout user

### Todos (`/api/todos`)
- `GET /` - Get user's todos
- `POST /` - Create new todo
- `PUT /:id` - Update todo
- `DELETE /:id` - Delete todo

### Forum (`/api/forum`)
- `GET /topics` - Get all topics
- `POST /topics` - Create new topic
- `GET /topics/:id/posts` - Get posts for topic
- `POST /topics/:id/posts` - Create post under topic
- `POST /posts/:id/share` - Share post

### Dashboard (`/api/dashboard`)
- `GET /task-allocation` - View task allocation
- `GET /project-progress` - View project progress
- `GET /resource-status` - View resource sufficiency

## Security Features

- Staff email validation
- Strong password requirements
- JWT-based authentication
- Role-based authorization
- No duplicate accounts
- Protection against external registration

## Development

```bash
# Install dependencies
npm install

# Start dev server with nodemon (runs on port 3000)
npm run dev

# Start production server
npm start
```
