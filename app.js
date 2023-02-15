const express = require("express");
const app = express();
const homeRoute = require("./Routes/home");
const searchRoute = require("./Routes/search");
const videoRoute = require("./Routes/video");
const noteRouter = require("./Routes/notes");
const authRouter = require("./Routes/auth");
const calRoute = require("./Routes/calculator");
const profileRouter = require("./Routes/profile");
const mapRouter = require("./Routes/map");
const passportStrategy = require("./config/passport-setup");
const dictionaryRouter = require("./Routes/dictionary");
const path = require("path");
require("dotenv").config();

const cookieSession = require("cookie-session");
const passport = require("passport");
const mongoose = require("mongoose");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());


// cookie configuration.
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));


// initilize passport and passport session.
app.use(passport.initialize());
app.use(passport.session());



// routes
app.use(homeRoute);
app.use(searchRoute);
app.use(videoRoute);
app.use(noteRouter);
app.use(authRouter);
app.use(calRoute);
app.use(profileRouter);
app.use(mapRouter);
app.use(dictionaryRouter);



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(output => {
    app.listen(3000, () => {
        console.log("Server started at port 3000.");
    });
})
.catch(err => {
    console.log(err);
});