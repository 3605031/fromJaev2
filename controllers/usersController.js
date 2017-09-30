// server side code to calculate shipping, tax, total price for subtotal and toal
// take in an object of {name, quantity} to return {total price, tax, shipping, quantity, name}
//shippo and stripe? 
const passport = require("passport");


var User = require("../models/user");
module.exports = {
  // This method handles retrieving articles from the db
  save: function(req, res) {
    console.log("Saving req body in controller", req.body)
  	var newUser =  new User({
  		username : req.body.username,
	    password : req.body.password,
	    email : req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      zipCode: req.body.zipCode,
      state: req.body.state,
      phoneNumber: req.body.phoneNumber
  	})

  	newUser.save(function(err, userSaved, success){
  		console.log(userSaved)
  		if(err){
  			console.log(err)
  		}
  		res.json({success:true});
  	})
  
  }

};