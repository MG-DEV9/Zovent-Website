const errorHandler = (err, _req, res, _next) => {
  console.error('[SAY Payment Error]', err.stack);

  if (
    err.message?.includes('SSL routines') ||
    err.message?.includes('Server selection timed out') ||
    err.message?.includes('Could not connect to any servers')
  ) {
    return res.status(503).json({
      message: 'Database connection failed. Check MongoDB Atlas Network Access and restart the API.',
    });
  }

  if (err.name === 'ValidationError') {
    const msgs = Object.values(err.errors).map(e => e.message).join(', ');
    return res.status(400).json({ message: msgs });
  }
  if (err.code === 11000)
    return res.status(409).json({ message: 'Duplicate entry.' });

  res.status(err.statusCode || 500).json({ message: err.message || 'Server error.' });
};

module.exports = errorHandler;
