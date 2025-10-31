// User model
// Represents users with different roles: Manager, Technical Specialist, Project Manager
// Fields: email (staff email), password (strong), role, createdAt

const bcrypt = require('bcrypt');

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

//DDL:
//'CREATE TABLE User (
//    UserID INT PRIMARY KEY AUTOINCREMENT,
//    email VARCHAR(255) UNIQUE NOT NULL,
//    password VARCHAR(255) NOT NULL,
//    role VARCHAR(20) NOT NULL,
//    accountStatus BOOLEAN,
//    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
//);'
export default {};