exports.getVideo = (req, res, next) => {
    res.render("video");
}

exports.getSelectedVideo = (req, res, next) => {
    const videoId = req.params.videoId;
    res.render("singleVideo", { videoId: videoId });
}