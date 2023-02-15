const express = require("express");
const router = express.Router();
const calculatorController = require("../Controllers/calculator");
const checkAuth = require("../authCheck/authCheck");



router.get("/calculator",checkAuth.checkAuth ,calculatorController.getCalculator);

module.exports = router;