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
  // CREATE TABLE IF NOT EXISTS tblUser (
  //     UserID INT PRIMARY KEY AUTO_INCREMENT,
  //     Email VARCHAR(191) UNIQUE NOT NULL,
  //     Password TEXT NOT NULL,
  //     Role VARCHAR(20) NOT NULL,
  //     AccountStatus BOOLEAN DEFAULT TRUE,
  //     CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //     UpdatedAt DATETIME DEFAULT NULL
  // );
export default {};