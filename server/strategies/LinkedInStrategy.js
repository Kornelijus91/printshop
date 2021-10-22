var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require("../models/user")

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    passReqToCallback: true,
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOne({username: profile.emails[0].value}).then((currentUser)=>{
      if(currentUser){
          if (!currentUser.firstName) {
            currentUser.firstName = profile.name.givenName;
          }
          if (!currentUser.lastName) {
            currentUser.lastName = profile.name.familyName;
          }
          if (!currentUser.linkedInId) {
            currentUser.linkedInId = profile.id;
          }
          currentUser.save().then((updatedUser) =>{
            done(null, updatedUser);
          });
      } else{
          new User({
            username: profile.emails[0].value,
            linkedInId: profile.id, 
            authStrategy: 'linkedIn', 
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          }).save().then((newUser) =>{
            done(null, newUser);
          });
       } 
    })
  }
));