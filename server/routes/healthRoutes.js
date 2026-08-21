import express from 'express';

const router = express.Router();

// GET /api/health - Public health check for Kubernetes liveness/readiness probes & monitoring
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
