const express = require("express");
const router = express.Router();
const mapController = require("../Controllers/map");
const authCheck = require("../authCheck/authCheck");

router.get("/map",authCheck.checkAuth, mapController.getMap);

module.exports = router;