const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { cookieSecret, mongoURI } = require('./env/keys');
const authRoutes = require('./routes/authRoutes');
require('./models/User');
require('./services/passport');

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [ cookieSecret ]
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}.`);
});
