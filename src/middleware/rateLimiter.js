const ipAddressList = {};

const createRateLimiter = ({ windowMs, maxRequests, message }) => {
  return (req, res, next) => {
    const ipClient = ipAddressList[req.ip];

    if (!ipClient) {
      ipAddressList[req.ip] = {
        count: 1,
        startTime: Date.now()
      };
      return next();
    }

    const windowCurrMs = Date.now() - ipClient.startTime;

    if (windowCurrMs > windowMs) {
      ipClient.count = 1;
      ipClient.startTime = Date.now();
      return next();
    } else {
      ipClient.count++;

      if (ipClient.count > maxRequests) {
        return res.error(429, message);
      }
      next();
    }
  };
};

const apiRateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  message: 'Too many requests'
});

module.exports = {
  createRateLimiter,
  apiRateLimiter
};
