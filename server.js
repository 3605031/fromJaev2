const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bluebird = require("bluebird");
var PORT = process.env.PORT || 4000;
var mongoose = require("mongoose");
var Product = require("./models/product.js")
var routes = require("./routes/routes");
mongoose.Promise = bluebird


const passport = require("passport");
//Stripe
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");



var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use("/", routes);

//Auth&Session
require('./passport/localsignin');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    // cookie: {
    //     secure: true
    // }
}));


app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete LinkedIn profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


//Login Routes
require("./routes/loginroutes")(app);





var db = process.env.MONGODB_URI || 'mongodb://Blake:Soithan1995@ds034677.mlab.com:34677/fromjae'
// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
app.listen(PORT, function() {
  console.log("Now listening on port %s! Visit localhost:%s in your browser.", PORT, PORT);
});

