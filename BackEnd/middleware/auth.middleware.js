const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  try {
    // Check if token is present in cookies
    const token = req.cookies.token;

    if (!token) {
      // Return immediately to prevent further code execution
      return res.status(401).json({ error: "Unauthorized access! Token missing." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log("[AUTH] Decoded token:", decoded);

    // Attach decoded user info to the request for routes to use
    // Assuming your token payload has 'id' and 'email' fields as per your sign method
    req.user = { id: decoded.id, email: decoded.email };

    // Pass control to the next middleware or route
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token!", error: error.message });
  }
};

module.exports = authenticate;
