const express = require("express");
const router = express.Router();
const dictionaryController = require("../Controllers/dictionary");
const authCheck = require("../authCheck/authCheck");


router.get("/dictionary",authCheck.checkAuth ,dictionaryController.getDictionary);

module.exports = router;