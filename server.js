const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var mongodb = require('mongodb');
var exphbs = require("express-handlebars");
//Stripe
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");

//Logger ??
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var session = require('express-session');


var MongoClient = mongodb.MongoClient;






// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;
