// User model
// Represents users with different roles: Manager, Technical Specialist, Project Manager
// Fields: email (staff email), password (strong), role, createdAt

export const UserRoles = {
  MANAGER: 'manager',
  TECHNICAL_SPECIALIST: 'technical_specialist',
  PROJECT_MANAGER: 'project_manager'
};

// TODO: Implement database schema
// User should have:
// - email (unique, staff email format)
// - password (hashed, strong password requirements)
// - role (one of UserRoles)
// - accountStatus (active/inactive)
// - createdAt, updatedAt

export default {};
