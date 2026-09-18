const mongoose = require('mongoose');

const logServerSelectionDetails = (err) => {
  const servers = err?.reason?.servers;
  if (!servers || typeof servers.forEach !== 'function') {
    return;
  }

  console.error('MongoDB server selection details:');
  servers.forEach((server, address) => {
    const details = [
      `address=${address}`,
      `type=${server?.type || 'unknown'}`,
      `error=${server?.error?.message || 'none'}`,
    ].join(' | ');
    console.error(`  - ${details}`);
  });
};

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = process.env.MONGO_URI_LOCAL;

  if (!primaryUri && !fallbackUri) {
    throw new Error(
      'Missing Mongo URI. Set MONGO_URI (Atlas) or MONGO_URI_LOCAL (local MongoDB).'
    );
  }

  try {
    const c = await mongoose.connect(primaryUri || fallbackUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected:', c.connection.host);
    return c;
  } catch (err) {
    const message =
      err.message?.includes('whitelist') || err.message?.includes('SSL')
        ? 'MongoDB connection failed. Check Atlas Network Access IP allowlist and TLS settings.'
        : err.message;
    console.error('MongoDB error:', message);
    if (err?.cause?.message) {
      console.error('MongoDB cause:', err.cause.message);
    }
    if (err?.reason?.message) {
      console.error('MongoDB reason:', err.reason.message);
    }
    logServerSelectionDetails(err);

    if (fallbackUri && primaryUri && primaryUri !== fallbackUri) {
      console.warn(
        'Retrying MongoDB connection with MONGO_URI_LOCAL fallback...'
      );
      try {
        const c = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 10000,
        });
        console.log(
          'MongoDB connected with local fallback:',
          c.connection.host
        );
        return c;
      } catch (fallbackErr) {
        console.error('MongoDB local fallback failed:', fallbackErr.message);
      }
    }

    throw err;
  }
};

module.exports = connectDB;
