const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

