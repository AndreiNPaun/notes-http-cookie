const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          console.log('User exists.');

          const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
          );
          const refreshToken = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
          );

          existingUser.token = token;
          existingUser.refreshToken = refreshToken;

          return done(null, existingUser);
        }

        // If user does not exist, create new user
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
        });

        await newUser.save();

        console.log('New user registered:', newUser);

        const user = await User.findOne({ email: email });
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
        );
        const refreshToken = jwt.sign(
          { email: user.email, id: user._id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
        );

        newUser.token = token;
        newUser.refreshToken = refreshToken;

        done(null, newUser);
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);

module.exports = passport;
