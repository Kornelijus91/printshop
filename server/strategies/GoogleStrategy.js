var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("../models/user")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL, 
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({username: profile.email}).then((currentUser)=>{
      if(currentUser){
          if (!currentUser.firstName) {
            currentUser.firstName = profile.given_name;
          }
          if (!currentUser.lastName) {
            currentUser.lastName = profile.family_name;
          }
          if (!currentUser.googleId) {
            currentUser.googleId = profile.id;
          }
          currentUser.save().then((updatedUser) =>{
            done(null, updatedUser);
          });
      } else{
          new User({
            username: profile.email,
            googleId: profile.id, 
            authStrategy: 'google', 
            firstName: profile.given_name,
            lastName: profile.family_name,
          }).save().then((newUser) =>{
            done(null, newUser);
          });
       } 
    })
  }
));