# Make-It-All

The best forum/to-do list thing ever!!111!111

## 📋 About

Make-It-All is a full-stack application combining forum functionality with task management features, specifically designed for internal team collaboration with role-based access control.

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI framework
- **Vite 5.4** - Build tool and dev server
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express 4.21** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## ✨ Key Features

### User Management
- 🔐 **Secure Authentication** - Staff email-based login with strong password requirements
- 👥 **Role-Based Access** - Three account types: Managers, Technical Specialists, and Project Managers
- 🛡️ **Account Protection** - One account per employee, internal staff only

### Forum System
- 💬 **Topics & Posts** - Create topics and post discussions
- 📤 **Post Sharing** - Share posts with team members (DM functionality)

### Task Management
- ✅ **Todo Lists** - Personal todo lists for all employees
- 📊 **Task Allocation** - View how tasks are distributed across team
- 📈 **Project Tracking** - Monitor project progress and resource allocation

### Dashboard (Managers)
- 📋 View task allocation across team members
- 🎯 Track project progress
- 👨‍💼 Assess resource sufficiency

## 🏗️ Project Structure

```
Make-It-All/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── features/           # Feature-based modules
│   │   │   ├── auth/           # Login, Register
│   │   │   ├── forum/          # Topics, Posts
│   │   │   ├── todos/          # Todo management
│   │   │   ├── dashboard/      # Analytics views
│   │   │   └── admin/          # User management
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   ├── utils/              # Utilities
│   │   ├── styles/             # CSS files
│   │   └── assets/             # Static assets
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── server/                      # Node.js + Express backend
│   ├── routes/                 # API endpoints
│   │   ├── auth.js             # Authentication
│   │   ├── todos.js            # Todo management
│   │   ├── forum.js            # Forum functionality
│   │   └── dashboard.js        # Dashboard analytics
│   ├── models/                 # Data models
│   │   ├── User.js             # User with roles
│   │   ├── Todo.js             # Todo items
│   │   ├── Topic.js            # Forum topics
│   │   └── Post.js             # Forum posts
│   ├── middleware/             # Custom middleware
│   │   └── auth.js             # JWT auth & authorization
│   ├── validators/             # Input validation
│   │   └── authValidator.js    # Email & password rules
│   ├── controllers/            # Business logic
│   ├── services/               # Service layer
│   ├── utils/                  # Utilities
│   ├── config/                 # Configuration
│   ├── index.js                # Server entry point
│   └── package.json
│
├── tests/                       # Test files
│   ├── client/                 # Frontend tests
│   └── server/                 # Backend tests
│
├── docs/                        # Documentation
│   ├── PROJECT_STRUCTURE.md    # Detailed structure guide
│   └── README.md
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
└── package.json                 # Root package config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Maseeek/Make-It-All.git
   cd Make-It-All
   ```

2. Install all dependencies (root, client, and server):
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development servers (both client and server):
   ```bash
   npm run dev
   ```

   Or start them separately:
   ```bash
   # Terminal 1 - Frontend (port 5173)
   npm run dev:client

   # Terminal 2 - Backend (port 3000)
   npm run dev:server
   ```

5. Open your browser:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api/health

## 🔧 Development Scripts

```bash
# Install all dependencies
npm run install:all

# Run both client and server concurrently
npm run dev

# Run client only
npm run dev:client

# Run server only
npm run dev:server

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed architecture overview
- [Client README](client/README.md) - Frontend documentation
- [Server README](server/README.md) - Backend API documentation
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

## 🔒 Security Requirements

- Staff email validation for login
- Strong password requirements (min 8 chars, uppercase, lowercase, number, special character)
- JWT-based authentication
- Role-based authorization
- One account per employee
- No external personnel registration
- Data protection methods to prevent targeting individuals

## 📝 Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
