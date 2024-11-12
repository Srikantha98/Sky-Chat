const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to protect routes that require authentication
const protect = (req, res, next) => {
  // Get token from the 'Authorization' header
  let token = req.header('Authorization');

  // If no token is provided, return an error
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove the 'Bearer ' prefix if it exists (because tokens are usually prefixed with 'Bearer')
  token = token.split(' ')[1]; // Extract the token from the 'Bearer <token>' format

  try {
    // Verify the token using the JWT secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information (user ID) to the request object
    req.user = decoded;  // The decoded JWT payload usually contains user information

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, respond with an error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { protect };
