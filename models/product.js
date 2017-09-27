var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Product's schema
var productSchema = new Schema({
    imgUrl : {type:String, required:true},
    product_ID:{type:Number,required:true},
    product_name: {type:String,required:true},
    product_category: {type:String,required:true},
    description: {type:String,required:false},
    price: {type:Number,required:true},
    quantity: {type:Number,required:true},
    weight: {type:Number,required:true},
    sku: {type: String, required: false},
    featured : {type:Boolean},
    popular : {type:Boolean},
    sale: {type:Boolean},
    new: {type:Boolean}
});

// Create the product model with the productSchema
var Product = mongoose.model("product", productSchema)

// Export the model
module.exports = Product;

