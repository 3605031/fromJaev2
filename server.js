const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var exphbs = require("express-handlebars");
var htmlRoutes = require("./routes/html-routes.js");
var apiRoutes = require("./routes/api-routes.js");
var PORT = process.env.PORT || 4000;
var mongoose = require("mongoose")
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
app.use("/", routes);

//need to put passport in here !!! 

var db = process.env.MONGODB_URI 
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


// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;
