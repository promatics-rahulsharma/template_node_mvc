const express = require("express");
const router = express.Router();
const authController = require("../../controllers/user/auth.controller");


router.post("/login", authController.loginUser);


module.exports = router;