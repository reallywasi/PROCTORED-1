// Importing jwt for verifying JSON Web Tokens
const jwt = require('jsonwebtoken');
// Importing dotenv to load environment variables from .env file
const dotenv = require('dotenv');

// Loading environment variables
dotenv.config();

// Middleware function for authentication
const auth = (req, res, next) => {
  // Getting the token from the Authorization header
  const token = req.header('Authorization').replace('Bearer ', '');
  // Checking if the token exists
  if (!token) {
    // If no token, return 401 Unauthorized
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verifying the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Adding the decoded user info to the request object
    req.user = decoded;
    // Proceeding to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return 401 Unauthorized
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Exporting the middleware function to use in other files
module.exports = auth;
