
var Cart = require("../models/Cart");
module.exports = {
app.get("/shoppingCart", function(req, res) {
	Cart.find({})
		.populate("cart_items")
		.exec(function(error, doc){
			if (error) {
				res.send(error);
			}
			else {
				res.send(doc);
			}
		});

});