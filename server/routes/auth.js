import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// --- Mock Database ---
// In a real app, you'd fetch this from your database
const saltRounds = 10;
const MOCK_USER = {
  id: "user-001",
  email: "maciek@make-it-all.co.uk",
  accountType: "admin",
  // Use hashSync to create the hash on server start
  passwordHash: bcrypt.hashSync("Password1!", saltRounds),
};
const EXPIRES = "2d"; // Token expiration time

// This handles POST requests to /api/auth/register
router.post("/register", async (req, res) => {
  // Made async
  try {
    // 1. Get the data from the frontend's request
    const { email, password, accountType } = req.body;
    const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN;

    // --- Validation ---
    if (!email || !password || !accountType) {
      // 400 = Bad Request
      return res.status(400).json({
        error: "Missing required fields (email, password, accountType).",
      });
    }

    // 1. Check if email domain is allowed
    if (allowedDomain && !email.endsWith(allowedDomain)) {
      return res.status(400).json({
        error: `Registration is only allowed for ${allowedDomain} emails.`,
      });
    }

    // --- TODO: Check if user already exists in your database ---
    // const existingUser = await db.users.find(u => u.email === email);
    // if (existingUser) {
    //     return res.status(409).json({ error: 'User with this email already exists.' });
    // }

    // Simulating user check
    if (email === MOCK_USER.email) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // 2. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const db = req.app.locals.db;

    db.run(
      "INSERT INTO tblUser (Email, Password, Role) VALUES (?, ?, ?)",
      [email, hashedPassword, accountType],
      function (error) {
        if (error) {
          console.error("Error inserting user into database:", error);
          return res
            .status(500)
            .json({ error: "Failed to register user in database." });
        }
      }
    );

    let id = db.get(
      "SELECT UserID FROM tblUser WHERE Email = ?",
      [email],
      (err, row) => {
        if (err) {
          console.error("Error retrieving user ID:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve user ID from database." });
        }
        id = row.UserID;
      }
    );

    const userId = id; // Get this ID from your database response

    // 4. Create a JWT (JSON Web Token)
    const token = jwt.sign(
      {
        userId: userId, // Use the new user's ID from your database
        email: email,
        accountType: accountType,
      },
      SECRET, // Your secret key from .env
      { expiresIn: EXPIRES } // Expiration from .env
    );

    // --- Send Response ---
    // Send the token back to the client
    res.status(201).json({
      message: "User registered successfully!",
      token: token, // Send the real token
    });
  } catch (error) {
    console.error("Error in /register route:", error.message);
    res.status(500).json({ error: "Server error during registration." });
  }
});

const SECRET = "TEMPSECRET1212";
// POST /api/auth/login
// Login with staff email and password
router.post("/login", async (req, res) => {
  // Made async
  try {
    const { identifier, password } = req.body;

    // --- Validation ---
    if (!identifier || !password) {
      return res
        .status(400)
        .json({ error: "Email/Identifier and password are required." });
    }

    // // --- TODO: Fetch user from your database by email/identifier ---
    // // const user = await db.users.find(u => u.email === identifier);

    // // Simulating database fetch
    // let user = null;
    // if (identifier === MOCK_USER.email) {
    //   user = MOCK_USER;
    // }

    let db = req.app.locals.db;
    let resu = null;
    db.get(
      "SELECT * FROM tblUser WHERE Email = ?",
      [identifier],
      async (err, row) => {
        if (err) {
          console.error("Error retrieving user from database:", err);
          return res
            .status(500)
            .json({ error: "Failed to retrieve user from database." });
        }
        resu = row;

        const user = resu;

        // --- Check 1: User exists ---
        if (!user) {
          return res
            .status(404)
            .json({ error: "Invalid credentials. User doesn't exist" }); // 404 = Not Found
        }

        // --- Check 2: Password is correct ---
        // Securely compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(password, user.Password);

        if (!isMatch) {
          return res
            .status(401)
            .json({ error: "Invalid credentials. Password is incorrect" });
        }

        // --- Success: Create JWT Token ---
        const token = jwt.sign(
          {
            userId: user.UserID,
            email: user.Email,
            accountType: user.Role,
          },
          SECRET,
          { expiresIn: EXPIRES }
        );

        // --- Send Response ---
        res.status(200).json({
          message: "Login successful!",
          token: token,
        });
      }
    );
  } catch (error) {
    console.error("Error in /login route:");
    console.error(error);
    res.status(500).json({ error: "Server error during login." });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  // On the server, JWT logout is often just letting the token expire.
  // The client is responsible for deleting the token.
  // You can optionally add a token blocklist here.
  res
    .status(200)
    .json({ message: "Logout successful. Please clear token on client." });
});

export default router;
