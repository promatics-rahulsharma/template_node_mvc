const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');
const userModel = require('../modules/users/user.model');
const adminModel = require('../modules/auth/admin.model');

/**
 * Middleware to verify JWT token
 */
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return sendError(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.user_id) {
      return sendError(res, 'Unauthorized', 401);
    }


    const user = await userModel.findById(decoded.user_id);
    console.log("🚀 ~ authenticateUser ~ user:", user)

    if (!user) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (user.is_deleted) {
      return sendError(res, 'Unauthorized', 401);
    }

    if (!user.is_active) {
      return sendError(res, 'Unauthorized.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};


const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return sendError(res, 'Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.admin_id) {
      return sendError(res, 'Unauthorized', 401);
    }


    const admin = await adminModel.findById(decoded.admin_id);
    console.log("🚀 ~ authenticateAdmin ~ admin:", admin)

    if (!admin) {
      return sendError(res, 'Unauthorized', 401);
    }

    req.admin = admin;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};


module.exports = {
  authenticateUser,
  authenticateAdmin
};
