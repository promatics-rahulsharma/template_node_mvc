const { sendSuccess } = require("../../utils/response")

exports.loginAdmin = (req, res) => {
    
  return sendSuccess({
    res,
    role: 'admin',
    message: 'Admin logged in successfully'
  })
}