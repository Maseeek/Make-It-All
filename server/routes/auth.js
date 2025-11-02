import express from 'express';
const router = express.Router();

// This handles POST requests to /api/auth/register
router.post('/register', (req, res) => {
  try {
    // 1. Get the data from the frontend's request
    const { email, password, accountType } = req.body;

    // --- Validation (Simple) ---
    if (!email || !password || !accountType) {
      // 400 = Bad Request
      return res.status(400).json({ error: 'Missing required fields (email, password, accountType).' });
    }

    console.log(`Received registration request for: ${email}, Type: ${accountType}`);

    // --- TODO: Add your logic here ---
    // 1. Check if user already exists in your database
    // 2. Hash the password (using bcrypt)
    // 3. Save the new user to the database
    // 4. Create a JWT (JSON Web Token)

    // --- Send Response ---
    // For now, just send a success message and a dummy token
    res.status(201).json({
      message: 'User registered successfully!',
      token: 'dummy-jwt-token-replace-with-real-one' // Send a token
    });

  } catch (error) {
    console.error('Error in /register route:', error.message);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// TODO: Add your login route
// router.post('/login', (req, res) => { ... });

export default router;
