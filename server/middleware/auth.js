const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const url = req.originalUrl || req.url;

  // CCAvenue checkout endpoints are public:
  // - client creates order and receives encRequest
  // - CCAvenue POSTs the encrypted response after payment
  if (
    url?.startsWith('/api/ccavenue/create-order') ||
    url?.startsWith('/api/ccavenue/response')
  ) {
    return next();
  }

  const header = req.headers.authorization;
  console.log(
    '[AUTH protect]',
    req.method,
    req.originalUrl || req.url,
    'hasAuth=',
    Boolean(header)
  );

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Authentication required.' });

  try {
    req.admin = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { protect };
