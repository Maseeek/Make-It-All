# Requirements to Implementation Mapping

This document maps the project requirements to the implemented file structure.

## Requirements Summary

### Basic Requirements

1. **Separate account types** for managers, technical specialists, and project managers
2. **Employees can create to-do lists**
3. **Users can create "topics" and "posts"** beneath topics (forum functionality)
4. **Posts can be shared** (DM functionality)
5. **Employees must register** to gain access to the system

### Login Requirements

1. **Login username must be a staff email**
2. **Must create strong password**
3. **No employee can have more than one account**
4. **No external personnel** should be able to register

### View Requirements (for Managers/Admins)

1. **See how well tasks are allocated**
2. **See how projects are progressing**
3. **See whether projects are sufficiently resourced**
4. **See if there are any areas where training should be provided** (future)
5. **Suitable data protection methods** to prevent targeting individuals

## Implementation Mapping

### User Roles & Authentication

**Requirement:** Separate account types for managers, technical specialists, and project managers

**Implementation:**
```
server/models/User.js
- UserRoles.MANAGER
- UserRoles.TECHNICAL_SPECIALIST
- UserRoles.PROJECT_MANAGER

server/middleware/auth.js
- authenticateToken() - JWT verification
- authorizeRoles(...roles) - Role-based access control

server/routes/auth.js
- POST /api/auth/register - New user registration
- POST /api/auth/login - User authentication
- POST /api/auth/logout - User logout

client/src/features/auth/
- Login.jsx - Login form component
- Register.jsx - Registration form component
```

### Staff Email Validation

**Requirement:** Login username must be a staff email, no external personnel

**Implementation:**
```
server/validators/authValidator.js
- validateEmail - Email format validation
- Staff email domain validation

.env.example
- ALLOWED_EMAIL_DOMAIN=@company.com

server/routes/auth.js
- Registration endpoint validates email domain
```

### Strong Password Requirements

**Requirement:** Must create strong password

**Implementation:**
```
server/validators/authValidator.js
- validatePassword - Minimum 8 characters
- Must contain: uppercase, lowercase, number, special character
- Password hashing with bcryptjs
```

### No Duplicate Accounts

**Requirement:** No employee can have more than one account

**Implementation:**
```
server/models/User.js
- email field marked as unique
- Database constraint prevents duplicate emails

server/controllers/ (to be implemented)
- Check for existing account during registration
```

### Todo Lists

**Requirement:** Employees can create to-do lists

**Implementation:**
```
server/models/Todo.js
- Todo item structure with assignment
- Support for personal and project todos

server/routes/todos.js
- GET /api/todos - List user's todos
- POST /api/todos - Create new todo
- PUT /api/todos/:id - Update todo
- DELETE /api/todos/:id - Delete todo

client/src/features/todos/
- TodoList.jsx - Todo management UI
```

### Forum System

**Requirement:** Users can create "topics" and "posts" beneath topics

**Implementation:**
```
server/models/Topic.js
- Forum topic structure

server/models/Post.js
- Forum post structure linked to topics

server/routes/forum.js
- GET /api/forum/topics - List all topics
- POST /api/forum/topics - Create new topic
- GET /api/forum/topics/:id/posts - Get posts for topic
- POST /api/forum/topics/:id/posts - Create post

client/src/features/forum/
- TopicList.jsx - Display forum topics
- PostList.jsx - Display posts under topic
```

### Post Sharing

**Requirement:** Posts can be shared (DM functionality)

**Implementation:**
```
server/routes/forum.js
- POST /api/forum/posts/:id/share - Share post functionality

server/models/Post.js
- canBeShared field (boolean)

client/src/features/forum/
- Share functionality in post components
```

### Task Allocation View

**Requirement:** Let them see how well tasks are allocated

**Implementation:**
```
server/routes/dashboard.js
- GET /api/dashboard/task-allocation
- Returns task distribution across team members

client/src/features/dashboard/
- Dashboard.jsx - Visualization of task allocation

server/middleware/auth.js
- authorizeRoles('manager', 'project_manager')
- Restricts access to managers only
```

### Project Progress View

**Requirement:** Let them see how projects are progressing

**Implementation:**
```
server/routes/dashboard.js
- GET /api/dashboard/project-progress
- Returns project status and completion metrics

server/models/Todo.js
- status field (pending, in-progress, completed)
- projectId field for grouping

client/src/features/dashboard/
- Dashboard.jsx - Project progress visualization
```

### Resource Sufficiency View

**Requirement:** Let them see whether projects are sufficiently resourced

**Implementation:**
```
server/routes/dashboard.js
- GET /api/dashboard/resource-status
- Analyzes team capacity vs. project needs

client/src/features/dashboard/
- Dashboard.jsx - Resource allocation display
```

### Admin User Management

**Requirement:** Manage user accounts and roles

**Implementation:**
```
client/src/features/admin/
- UserManagement.jsx - Admin interface for user management

server/middleware/auth.js
- authorizeRoles('manager') for admin routes

Future endpoints:
- GET /api/admin/users - List all users
- PUT /api/admin/users/:id - Update user role/status
- DELETE /api/admin/users/:id - Deactivate user
```

### Data Protection

**Requirement:** Suitable data protection methods to prevent targeting individuals

**Implementation:**
```
server/middleware/auth.js
- JWT authentication on all protected routes
- Role-based authorization

server/validators/
- Input validation to prevent injection attacks

.env.example
- JWT_SECRET for token signing
- Environment-based configuration

Future considerations:
- Rate limiting middleware
- Audit logging
- Data access controls
```

## Tech Stack Supporting Requirements

### React + Vite (Frontend)
- **Fast development** with hot module replacement
- **Component-based** architecture for reusability
- **Client-side routing** for smooth navigation
- **Modern JavaScript** with ES modules

### Node.js + Express (Backend)
- **RESTful API** design
- **Middleware pattern** for authentication and validation
- **Scalable** architecture
- **Express-validator** for input sanitization

### Security Stack
- **JWT** - Stateless authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin protection
- **dotenv** - Environment variable management

## File Structure Benefits

1. **Feature-based organization** - Easy to locate functionality
2. **Clear separation** - Frontend and backend independent
3. **Role-based routing** - Security at the architecture level
4. **Scalable structure** - Can grow with requirements
5. **Developer-friendly** - Clear naming and organization

## Next Steps for Full Implementation

1. **Database Integration** - Add PostgreSQL/MongoDB
2. **Implement Controllers** - Complete business logic
3. **Frontend State Management** - Add React Context/Redux
4. **Build UI Components** - Create reusable component library
5. **Add Tests** - Unit and integration tests
6. **API Documentation** - Swagger/OpenAPI spec
7. **Deployment** - CI/CD pipeline setup
