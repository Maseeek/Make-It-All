// Authentication middleware
// Verify JWT tokens and protect routes
import jwt from "jsonwebtoken";
import { SECRET } from "../routes/auth.js";

export const isAuthorized = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export const hasRoles = (...roles) => {
  // Check if user has required role (manager, technical_specialist, project_manager)
  return (req, res, next) => {
    if (!roles.includes(req.user.accountType)) {
      return res.status(403).json({ error: "Forbidden: Insufficient rights" });
    }
    next();
  };
};
