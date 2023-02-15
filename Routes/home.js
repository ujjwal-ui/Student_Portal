const express = require("express");
const router = express.Router();
const homeController = require("../Controllers/home");
const authCheck = require("../authCheck/authCheck");



router.get("/home",authCheck.checkAuth, homeController.getHome);

module.exports = router;