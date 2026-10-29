import promClient from 'prom-client';

// Prometheus Custom Metrics Registry
export const register = new promClient.Registry();

// Enable default Node.js and system process metrics (CPU, Memory Heap, Event Loop, Handles)
promClient.collectDefaultMetrics({
  register
});

// Counter Metric: Tracks the total number of HTTP requests
export const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests handled by the server',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Histogram Metric: Measures request duration/latency in seconds across configurable buckets
export const httpRequestDurationSeconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request durations in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register]
});

// Gauge Metric: Measures currently in-flight active HTTP requests
export const httpActiveRequests = new promClient.Gauge({
  name: 'http_active_requests',
  help: 'Current number of active HTTP requests being processed',
  registers: [register]
});

// Helper to normalize URL paths and mask MongoDB ObjectIDs to avoid high cardinality in Prometheus
function normalizePath(req) {
  const path = req.baseUrl || req.path || '/';
  // Replace 24-char hex ObjectIDs with :id
  return path.replace(/[0-9a-fA-F]{24}/g, ':id');
}

// Middleware to record request metrics
export const metricsMiddleware = (req, res, next) => {
  // Skip metrics collection for Prometheus scrape itself to avoid self-referential metric inflation
  if (req.path === '/metrics' || req.path === '/api/metrics') {
    return next();
  }

  httpActiveRequests.inc();
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    httpActiveRequests.dec();
    const endTime = process.hrtime.bigint();
    const durationSeconds = Number(endTime - startTime) / 1e9;

    const route = normalizePath(req);
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString()
    };

    httpRequestsTotal.inc(labels);
    httpRequestDurationSeconds.observe(labels, durationSeconds);
  });

  next();
};

// Handler for the Prometheus scrape endpoint
export const metricsHandler = async (_req, res) => {
  try {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  } catch (error) {
    res.status(500).send(error.message);
  }
};

