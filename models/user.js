var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt"),
	SALT_WORK_FACTOR = 10;

//user's schema
var userSchema = new Schema({
    username : {type:String, required:true,unique:true},
    password:{type:String,required:true},
    email: {type:String,unique:true},
    firstName:{type: String, required: false},
    lastName:{type: String, required: false},
    address:{type: String, required: false},
    state:{type: String, required: false},
    zipCode:{type: String, required: false},
    phoneNumber:{type: String, required: false},
    
});


//HASH pw before saving
userSchema.pre('save',function(next){
	var user = this;

	// only hash the password if it has been modified (or is new)
	if(!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
})

//compare methods
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Create the user model with the userSchema
var user = mongoose.model("user", userSchema)

// Export the model
module.exports = user;

