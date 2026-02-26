const { sendSuccess } = require("../../utils/response")

exports.loginUser = (req, res) => {

  return sendSuccess({
    res,
    role: 'user',
    message: 'User logged in successfully'
  })
}