// Import necessary modules and dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./models'); // Import your User model

// Configure the local strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Validate password here
      // You should implement password validation logic here, e.g., using bcrypt

      // For example, if you have a hashed password stored in the user record:
      // const isValidPassword = await user.isValidPassword(password);
      // if (!isValidPassword) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Use Passport.js middleware in your Express app
app.use(passport.initialize());
app.use(passport.session());

