const FacebookStrategy = require('passport-facebook').Strategy;
const User      = require("../models/user");
const session   = require('express-session');


module.exports = (app, passport) => {


  app.use(passport.initialize());
  app.use(passport.session());

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))



  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });




  passport.use(new FacebookStrategy({
    clientID: "266461434071507",
    clientSecret: "a4676dd3d21940edbf336fa2fa087c22",
    callbackURL: "https:pltrades.com/login?=test",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null, profile);
  }
));


app.get('auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/login'
}));

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'read_stream'
}));


return passport;
};
