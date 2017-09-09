var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Product's schema
var schema = new Schema({
    imgUrl : {type:String, required:true},
    product_ID:{type:Number,required:true},
    product_name: {type:String,required:true},
    product_category: {type:String,required:true},
    description: {type:String,required:false},
    price: {type:Number,required:true},
    quantity: {type:Number,required:true}
});

module.exports = mongoose.model('Product',schema);