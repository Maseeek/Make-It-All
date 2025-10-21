import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Make-It-All API is running' });
});

// Import routes (to be implemented)
// import authRoutes from './routes/auth.js';
// import todoRoutes from './routes/todos.js';
// import forumRoutes from './routes/forum.js';

// Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);
// app.use('/api/forum', forumRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Make-It-All: The best forum/to-do list thing ever!');
});
