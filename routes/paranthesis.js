const express = require("express");
const router = express.Router();
const paranthesisController = require("../controller/paranthesis.controller");
const tokenValidation = require('../utils/isTokenValid')


router
    .route('/balanced')
    .post(tokenValidation.isTokenValid, paranthesisController.isBalance)

module.exports = router;