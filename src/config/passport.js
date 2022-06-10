const passport = require("passport");
LocalStrategy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;


const User = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });
      
      if (!user) {
        return done(null, false, { message: "Not User found." });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      }
    }
  )
);

passport.use(new FacebookStrategy({
    clientID: '1706657256350037',
    clientSecret: 'b61c15cbdc77cddc994cc95d2b61f778',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['name','email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});