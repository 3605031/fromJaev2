//Authentication
const passport = require('passport');
const bcrypt = require('bcrypt');
var User = require("../models/user");
const LocalStrategy = require('passport-local').Strategy;
const config = require("../config")
const jwt = require('jsonwebtoken');

passport.use('local-login',new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}).exec(function(err, user){
            if (err) throw err
            if(!user){
                return done(null,false,{message:"Unknown username"})
            }
            //Check if password is valid and return done(user) with user object if it is
            var pwMatched = bcrypt.compareSync(password,user.password);
            if(pwMatched){
            	const payload = {
            		sub : user._id
            	}

            	const token = jwt.sign(payload,config.jwtSecret);
            	const data = {
            		name : user.username,
            		email: user.email,
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    zipCode: user.zipCode,
                    state: user.state,
                    phone: user.phoneNumber,
            	}

                return done(null,token,data);
            }
            if(!pwMatched){
                return done(null,false,{message: "Wrong password"});
            }
        });
    }
));