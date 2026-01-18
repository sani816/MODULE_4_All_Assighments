let requestCounts = {};
const LIMIT = 15;
const WINDOW_TIME = 60 * 1000; // 

const rateLimiter = (req, res, next) => {
  const now = Date.now();

  if (!requestCounts[req.ip]) {
    requestCounts[req.ip] = { count: 1, startTime: now };
    return next();
  }

  const elapsed = now - requestCounts[req.ip].startTime;

  if (elapsed > WINDOW_TIME) {
    requestCounts[req.ip] = { count: 1, startTime: now };
    return next();
  }

  if (requestCounts[req.ip].count >= LIMIT) {
    return res.status(429).json({
      error: "Too many requests, please try again later",
    });
  }

  requestCounts[req.ip].count++;
  next();
};

module.exports = rateLimiter;
