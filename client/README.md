# Client - React + Vite

This directory contains the frontend application built with React and Vite.

## Tech Stack

- **React 18.3** - UI framework
- **Vite 5.4** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

## Structure

- `src/features/` - Feature-based modules
  - `auth/` - Authentication (login, register)
  - `forum/` - Forum topics and posts
  - `todos/` - Todo list management
  - `dashboard/` - Task allocation and project progress views
  - `admin/` - User management for administrators
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components
- `src/contexts/` - React context providers
- `src/hooks/` - Custom React hooks
- `src/services/` - API service functions
- `src/utils/` - Utility functions and helpers
- `src/styles/` - Global styles and CSS
- `src/assets/` - Images, fonts, and other static assets

## Key Features

### Authentication & Authorization
- Staff email login (username must be staff email)
- Strong password validation
- Role-based access (Manager, Technical Specialist, Project Manager)
- No duplicate accounts per employee

### Forum System
- Create and view topics
- Post under topics
- Share posts (DM functionality)

### Todo Management
- Create personal todo lists
- View task allocation
- Track project progress

### Dashboard Views (for Managers)
- Task allocation across team members
- Project progress tracking
- Resource sufficiency analysis

## Development

```bash
# Install dependencies
npm install

# Start dev server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
