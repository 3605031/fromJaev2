var express = require("express");
var path = require("path");
var apiRoutes = require("./apiRoutes");
var authRoutes = require("./authRoutes");
var router = new express.Router();
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api", apiRoutes);
router.use("/auth", authRoutes);
router.post("/pay", function(req, res){
	console.log(req)
})
router.post("/cart", function(req, res){
	let cart = req.body.cart
	let stripeItems = cart.map(item=>({type:"sku", parent:item.sku, quantity:parseInt(item.purchaseQuantity), amount:parseFloat(item.price)*100, description:item.product_name}))
	console.log("skuarray is " , stripeItems)
	let stripeOrderCreate = {
		currency: "usd",
		items: stripeItems,
		shipping: {
			name: `${req.body.firstName} ${req.body.lastName}`,
			address: {
				line1: req.body.address,
				city: "San Diego",
				state: "CA",
				country: "US",
				postal_code: "92122"
			}
		},
		email: req.body.email
	}
	stripe.orders.create(stripeOrderCreate, function(err, order){
		if (err) throw err 
		res.json(order)
	})
})
// Otherwise send all other requests the index.html page
// React router will handle routing withing the app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});
module.exports = router;