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


class User {
  constructor(email, password, role=UserRoles, createdAt) {

    this.email = email;

    this.password = password;
    
    this.role = role;

    this.createdAt = createdAt;   

  }

  //Getter methods
  getEmail() {
    return this.email;
  }

  getPassword() {
    return hashPassword(this.password);
  }

  getRole() {
    return this.role;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  //Setter method
  setRole(newRole) {
    this.role = newRole;
  }


  //Instance methods
  verifyPassword(inputPassword) {
    if (bcrypt.compareSync(inputPassword, this.password)) {
      return true;
    } else {
      return false;
    }
  }

  //Static methods

  //Static asynchronous method to validate email
  static async validateEmail(email) {
    try {
      //Valid domain check
      let domain = email.split('@')[1].toLowerCase();
      if (domain !== 'make-it-all.co.uk') {
      throw new Error('Invalid email domain.')
      }

      //TODO: Unique email check (requires database access, see below TODO)

      return true;
    }

    catch (Error) {
      return false;
    }
  }

  static checkStrongRequirements(password) {
    try {
      //8-character check
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.')
      }

      //One number check (must have 1 number)
      minimumOneNumber = '/[0-9]/';
      if (!minimumOneNumber.test(password)) {
        throw new Error('Password must contain at least one number.')
      }

      //Uppercase letter check (must have 1 uppercase letter)
      minimumOneUppercase = '/[A-Z]/';
      if (!minimumOneUppercase.test(password)) {
        throw new Error('Password must contain at least one uppercase letter.')
      }

      //Lowercase letter check (must have 1 lowercase letter)
      minimumOneLowercase = '/[a-z]/';
      if (!minimumOneLowercase.test(password)) {
        throw new Error('Password must contain at least one lowercase letter.')
      }

      //Special character check (must have 1 special character)
      minimumOneSpecialChar = '/[!@#$%^&*(),.?":{}|<>]/';
      if (!minimumOneSpecialChar.test(password)) {
        throw new Error('Password must contain at least one special character.')
      }

    //Strong requirement check not met outcome
    } catch (Error) {
      return false;
    }
  }

  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  

}