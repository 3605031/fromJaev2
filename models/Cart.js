var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Product's schema
var CartSchema = new Schema({
    price: {type:Number,required:true},
    quantity: {type:Number,required:true},
    img_url : {type:String, required:true},
    cart_items: [{type: Schema.Types.ObjectId,ref: "Product"}],

});

// Create the product model with the productSchema
var Cart = mongoose.model("Cart", CartSchema)

// Export the model
module.exports = Cart;




// Cart model to have these exact properties for now:
// price: Integer,
// quantity: integer,
// img_url: string,
// item_name: string

// cart is going to be a list of product ID's
// 