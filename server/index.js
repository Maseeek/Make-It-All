import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runDDLScript } from "./db/sqlite/database_run_setup.js";
import sqlite3 from "sqlite3";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbFile = "./data.db";
runDDLScript();

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("Failed to open SQLite DB:", err);
    process.exit(1);
  }
  console.log("SQLite DB opened:", dbFile);
});
app.locals.db = db;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Make-It-All API is running" });
});

// Import routes (to be implemented)
import authRoutes, {saltRounds} from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import forumRoutes from "./routes/forum.js";
import bcrypt from "bcrypt";

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/forum", forumRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


// // variable definitions
const [email, hashedPassword, accountType] = ["admin@make-it-all.co.uk", bcrypt.hashSync("Password1!", 10), "admin"];
const [email1, hashedPassword1, accountType1] = ["ts@make-it-all.co.uk", bcrypt.hashSync("Password1!", 10), "technical_specialist"];
const [email2, hashedPassword2, accountType2] = ["manager@make-it-all.co.uk", bcrypt.hashSync("Password1!", 10), "manager"]; // corrected typo

// // sql statement to insert all three rows
const sql = `
  INSERT INTO tblUser (Email, Password, Role) VALUES 
  (?, ?, ?), 
  (?, ?, ?), 
  (?, ?, ?)
`;

// // combine all parameters into one array
const params = [
  email, hashedPassword, accountType,
  email1, hashedPassword1, accountType1,
  email2, hashedPassword2, accountType2
];

// // run the single query
db.run(sql, params, function(err) {
  if (err) {
    return console.error('Error inserting initial users:', err.message);
  }
  console.log(`Successfully inserted ${this.changes} users.`);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Make-It-All: The best forum/to-do list thing ever!");
});
