var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const User = require("../models/user")

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    // callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
    callbackURL: '/users/auth/facebook/callback',
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name']
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({username: profile._json.email}).then((currentUser)=>{
      if (currentUser){
        if (!currentUser.firstName) {
          currentUser.firstName = profile._json.first_name;
        }
        if (!currentUser.lastName) {
          currentUser.lastName = profile._json.last_name;
        }
        if (!currentUser.facebookId) {
          currentUser.facebookId = profile._json.id;
        }
        currentUser.save().then((updatedUser) =>{
          done(null, updatedUser);
        });
      } else {
        new User({
          username: profile._json.email,
          facebookId: profile._json.id, 
          authStrategy: 'facebook', 
          firstName: profile._json.first_name,
          lastName: profile._json.last_name,
        }).save().then((newUser) =>{
          done(null, newUser);
        });
      }
    })
}));