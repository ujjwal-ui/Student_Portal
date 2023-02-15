const express = require("express");
const router = express.Router();
const videoController = require("../Controllers/video");
const authCheck = require("../authCheck/authCheck");


router.get("/watch-videos",authCheck.checkAuth, videoController.getVideo);
router.get("/watch-videos/:videoId",authCheck.checkAuth, videoController.getSelectedVideo);

module.exports = router;