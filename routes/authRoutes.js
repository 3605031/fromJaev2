


var express = require("express")
var router = new express.Router()
var usersController = require("../controllers/usersController");
const passport = require('passport');




// Get all products
router.post("/signup", usersController.save)










module.exports = router;