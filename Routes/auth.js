const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth");


router.get("/", authController.getIndex);
router.get("/auth/google", authController.getGoogleAuth);
router.get("/auth/google/redirect", authController.getRedirect);

router.get("/auth/facebook", authController.getFacebookAuth);
router.get("/auth/facebook/redirect", authController.getFacebookRedirect);

module.exports = router;