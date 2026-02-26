/**
 * Standardized API response helpers
 */

/**
 * Send success response
 */
const sendSuccess = ({
  res,
  message,
  data,
  statusCode = 200,
   ...rest
}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    // data,
    // ...rest, 
    ...(data !== undefined && { data }),
    ...rest,
  });
};

/**
 * Send error response
 */
const sendError = (res, message, statusCode = 400, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
     ...(errors ? { errors } : {}),
  });
};


module.exports = {
  sendSuccess,
  sendError
};
