const passport = require("passport");


exports.getIndex = (req, res, next) => {
    res.render("index");
}

// concent screen handling middleware
exports.getGoogleAuth = passport.authenticate("google", {
    scope: ["profile"]
});

// Google redirect middleware
exports.getRedirect = passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
});


// facebook concent screen handling.
exports.getFacebookAuth = passport.authenticate("facebook");

// facebook redirect middleware.
exports.getFacebookRedirect = passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/"
});