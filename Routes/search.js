const express = require("express");
const router = express.Router();
const searchController = require("../Controllers/search");
const authCheck = require("../authCheck/authCheck");


router.get("/search",authCheck.checkAuth, searchController.getSearch);

module.exports = router;