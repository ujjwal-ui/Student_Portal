const passport  = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const User = require("../Model/user");


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // check the user with this id in the database.
    // use done method to pass it over to the next stage.
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

// Google Strategy
passport.use(new GoogleStrategy({
    // options for strategy.
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {    // passport callback function.
      
        User.findOne({ googleID: profile.id })
        .then(user => {
            if(!user) {
                const user = new User({
                    name: profile.displayName,
                    img: profile.photos[0].value,
                    googleID: profile.id
                });
                user.save(err => {
                    if(err) {
                        console.log(err);
                    }
                });
                console.log(user)
               return done(null, user);
            }
            done(null, user);
        })
        .catch(err => {
            console.log(err);
        });
        
        // check if the user already exsist in the database.

        // store the user details in the database.
    }
));



// facebook Strategy
passport.use(new FacebookStrategy({
    clientID: "466222444618928",
    clientSecret: "2ef8ef2442e54eec81d3654137a282eb",
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

        User.findOne({ facebookID: profile.id })
        .then(user => {
            if(!user) {
                const user = new User({
                    name: profile.displayName,
                    img: profile.photos[0].value,
                    facebookID: profile.id
                });
                user.save(err => {
                    if(err) {
                        console.log(err);
                    }
                });
                console.log(user)
               return done(null, user);
            }
            done(null, user);
        })
        .catch(err => {
            console.log(err);
        })
    
    }
));



// clientID
// 466222444618928


// Client Secret
// 2ef8ef2442e54eec81d3654137a282eb