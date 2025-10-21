import { body } from 'express-validator';

// Validate staff email format
// TODO: Define specific email structure (e.g., @company.com)
export const validateEmail = body('email')
  .isEmail()
  .withMessage('Must be a valid staff email')
  .normalizeEmail();

// Validate strong password
// TODO: Define specific requirements (length, complexity, etc.)
export const validatePassword = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  .withMessage('Password must contain uppercase, lowercase, number, and special character');

export const registerValidation = [
  validateEmail,
  validatePassword,
  body('role')
    .isIn(['manager', 'technical_specialist', 'project_manager'])
    .withMessage('Invalid role specified')
];

export const loginValidation = [
  validateEmail,
  body('password').notEmpty().withMessage('Password is required')
];
