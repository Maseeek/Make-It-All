# Project Structure

This document describes the organization of the Make-It-All project, built with React, Vite, and Node.js.

## Overview

The project is organized as a modern full-stack application with a feature-based architecture on the frontend and a layered architecture on the backend, specifically designed to meet the requirements for a forum/todo list system with role-based access control.

## Tech Stack

### Frontend
- **React 18.3** - UI library
- **Vite 5.4** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.21** - Web framework
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Directory Structure

```
Make-It-All/
├── client/                      # React + Vite frontend application
│   ├── src/
│   │   ├── features/           # Feature-based modules (business logic)
│   │   │   ├── auth/           # Authentication (Login, Register)
│   │   │   ├── forum/          # Forum (Topics, Posts)
│   │   │   ├── todos/          # Todo list management
│   │   │   ├── dashboard/      # Dashboard views for managers
│   │   │   └── admin/          # User management
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── contexts/           # React context providers (state)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service layer
│   │   ├── utils/              # Helper functions
│   │   ├── styles/             # Global CSS and styling
│   │   ├── assets/             # Images, fonts, static files
│   │   ├── main.jsx            # React entry point
│   │   └── App.jsx             # Root component
│   ├── index.html              # HTML template
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Client documentation
│
├── server/                      # Node.js + Express backend API
│   ├── routes/                 # API endpoint definitions
│   │   ├── auth.js             # Auth routes (register, login)
│   │   ├── todos.js            # Todo CRUD operations
│   │   ├── forum.js            # Forum topics and posts
│   │   └── dashboard.js        # Dashboard analytics
│   ├── controllers/            # Request handlers and business logic
│   ├── models/                 # Database models/schemas
│   │   ├── User.js             # User model with roles
│   │   ├── Todo.js             # Todo item model
│   │   ├── Topic.js            # Forum topic model
│   │   └── Post.js             # Forum post model
│   ├── middleware/             # Custom Express middleware
│   │   └── auth.js             # JWT auth & role authorization
│   ├── validators/             # Input validation rules
│   │   └── authValidator.js    # Email & password validation
│   ├── services/               # Business logic services
│   ├── utils/                  # Helper utilities
│   ├── config/                 # Configuration files
│   ├── index.js                # Express server entry point
│   ├── package.json            # Backend dependencies
│   └── README.md               # Server documentation
│
├── tests/                       # Test files
│   ├── client/                 # Frontend tests (Jest/Vitest)
│   ├── server/                 # Backend tests (Jest/Mocha)
│   └── README.md               # Testing documentation
│
├── docs/                        # Project documentation
│   ├── PROJECT_STRUCTURE.md    # This file
│   └── README.md               # Documentation index
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
├── package.json                 # Root scripts and dependencies
└── README.md                    # Main project README
```

## Architecture Patterns

### Frontend - Feature-Based Architecture

The frontend uses a feature-based structure where each feature is self-contained:

**Features:**
- `auth/` - User authentication and registration
- `forum/` - Forum topics and posts management
- `todos/` - Todo list functionality
- `dashboard/` - Analytics and overview for managers
- `admin/` - User and role management

**Supporting Directories:**
- `components/` - Shared UI components (buttons, forms, etc.)
- `contexts/` - Global state management with React Context
- `hooks/` - Reusable logic (useAuth, useTodos, etc.)
- `services/` - API integration layer
- `utils/` - Helper functions and constants

### Backend - Layered Architecture

The backend follows a traditional layered architecture:

1. **Routes Layer** - Endpoint definitions and routing
2. **Middleware Layer** - Authentication, validation, error handling
3. **Controller Layer** - Request/response handling
4. **Service Layer** - Business logic
5. **Model Layer** - Data structures and database schemas

## Requirements Implementation

### User Roles
- **Manager** - Full access to dashboard, task allocation, resources
- **Technical Specialist** - Access to tasks and forum
- **Project Manager** - Project oversight and planning

### Authentication & Authorization
- Staff email-based login (validated against email domain)
- Strong password requirements (enforced by validator)
- JWT tokens for session management
- Role-based route protection

### Forum System
- Create topics (all authenticated users)
- Post under topics
- Share posts (DM functionality - to be implemented)

### Todo Management
- Personal todo lists
- Task assignment and tracking
- Project-based todos

### Dashboard Features (Managers)
- Task allocation visualization
- Project progress tracking
- Resource sufficiency analysis
- Training needs identification (future)

### Security & Data Protection
- Email validation (staff only)
- Password strength enforcement
- Single account per employee
- Protected routes by role
- Data protection methods (to be implemented)

## Design Principles

### Separation of Concerns
- Clear boundaries between features and layers
- Frontend and backend completely decoupled
- API as the contract between client and server

### Scalability
- Feature-based frontend allows easy addition of new features
- Modular backend can scale horizontally
- Database-agnostic model layer (ready for any DB)

### Security First
- Authentication middleware on all protected routes
- Input validation on all endpoints
- Role-based authorization
- Environment-based configuration

### Developer Experience
- Hot module replacement with Vite
- Nodemon for server auto-restart
- Concurrent dev mode for both client and server
- Clear documentation and README files

## Development Workflow

1. **Setup**: Run `npm run install:all` to install all dependencies
2. **Development**: Run `npm run dev` to start both client and server
3. **Frontend Only**: Run `npm run dev:client` (port 5173)
4. **Backend Only**: Run `npm run dev:server` (port 3000)
5. **Build**: Run `npm run build` to create production build
6. **Production**: Run `npm start` to run production server

## API Structure

All API endpoints are prefixed with `/api`:

- `/api/auth/*` - Authentication endpoints
- `/api/todos/*` - Todo management
- `/api/forum/*` - Forum functionality
- `/api/dashboard/*` - Analytics and reporting

The frontend proxies API requests through Vite's dev server to avoid CORS issues during development.

## Next Steps

1. **Database Integration** - Add PostgreSQL or MongoDB
2. **Complete Controllers** - Implement business logic
3. **Frontend Components** - Build UI components
4. **Testing** - Add unit and integration tests
5. **CI/CD** - Set up automated deployment
6. **Documentation** - Add API documentation (Swagger/OpenAPI)

## Getting Started

See the main [README.md](../README.md) for installation and setup instructions.
