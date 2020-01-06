const express = require("express");
const router = express.Router();
const loginController = require("../controller/login.controller");
const tokenValidation = require('../utils/isTokenValid');


router
    .route('/register')
    .post(loginController.register)

router
    .route("/login")
    .post(loginController.login)
router
    .route("/removeUser")
    .delete(tokenValidation.isTokenAdmin, loginController.removeUser)
router
    .route("/removeAllRecords")
    .delete(loginController.removeAllRecords)
router
    .route("/getAllUsers")
    .get(tokenValidation.isTokenAdmin, loginController.getAllUsers)


module.exports = router;