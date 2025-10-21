import express from 'express';

const router = express.Router();

// GET /api/dashboard/task-allocation
// View how well tasks are allocated across team members
// For managers and admins
router.get('/task-allocation', (req, res) => {
  res.json({ message: 'Task allocation endpoint - to be implemented' });
});

// GET /api/dashboard/project-progress
// View project progress overview
router.get('/project-progress', (req, res) => {
  res.json({ message: 'Project progress endpoint - to be implemented' });
});

// GET /api/dashboard/resource-status
// View if projects are sufficiently resourced
router.get('/resource-status', (req, res) => {
  res.json({ message: 'Resource status endpoint - to be implemented' });
});

export default router;
