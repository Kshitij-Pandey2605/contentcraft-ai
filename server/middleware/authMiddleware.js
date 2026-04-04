const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendError } = require('../utils/responseHandler');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'contentcraft_hackathon_secret_key');

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user && decoded.id === 'offline_mock_id_9999') {
          // Special case for Hackathon offline demo logins
          req.user = {
              _id: 'offline_mock_id_9999',
              name: 'Demo User',
              email: 'demo@contentcraft.ai',
              preferredPlatform: 'Instagram'
          };
      }

      if (!req.user) {
          return sendError(res, 'Not authorized, user not found', 401);
      }

      next();
    } catch (error) {
      console.error('Auth Middleware Error:', error);
      return sendError(res, 'Not authorized, token failed', 401);
    }
  }

  if (!token) {
    return sendError(res, 'Not authorized, no token', 401);
  }
};

module.exports = { protect };
