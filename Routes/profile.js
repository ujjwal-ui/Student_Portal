const express = require("express");
const router = express.Router();
const profileController = require("../Controllers/profile");
const authCheck = require("../authCheck/authCheck");

router.get("/profile",authCheck.checkAuth, profileController.getProfile);

module.exports = router;