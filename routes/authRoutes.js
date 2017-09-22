


var express = require("express")
var router = new express.Router()
var usersController = require("../controllers/usersController");

// Get all products
router.post("/signup", usersController.save)
router.post("/login")









module.exports = router;