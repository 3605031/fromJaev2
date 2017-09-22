const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bluebird = require("bluebird");
var PORT = process.env.PORT || 4000;
var mongoose = require("mongoose");
var Product = require("./models/product.js")
var routes = require("./routes/routes");
mongoose.Promise = bluebird
//Stripe
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");

//Logger ??
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');


var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use("/", routes);

//need to put passport in here !!! 

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

