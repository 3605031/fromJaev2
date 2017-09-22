// server side code to calculate shipping, tax, total price for subtotal and toal
// take in an object of {name, quantity} to return {total price, tax, shipping, quantity, name}
//shippo and stripe? 


var User = require("../models/user");
module.exports = {
  // This method handles retrieving articles from the db
  save: function(req, res) {
  	var newUser =  new User({
  		username : req.body.username,
  	    password : req.body.password,
  	    email : req.body.email
  	})

  	newUser.save(function(err, userSaved, success){
  		console.log(userSaved)
  		if(err){
  			console.log(err)
  		}
  		res.json({success:true});
  	})
  
  },
  validate: function(req,res) {

  }
};