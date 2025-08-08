var jwt = require('jsonwebtoken');
const jwt_secret = process.env.jwt_secret; // Define your JWT secret key


// Middleware to fetch user from JWT token
function fetchUser(req, res, next) {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = fetchUser;