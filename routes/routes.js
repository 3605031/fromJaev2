var express = require("express");
var path = require("path");
var apiRoutes = require("./apiRoutes");
var authRoutes = require("./authRoutes");
var router = new express.Router();
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");
var shippo = require('shippo')('shippo_test_7d3322dc54a6d8e3aa8f19dad3b4ae35a1620e8f');

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api", apiRoutes);

router.use("/auth", authRoutes);


//Paying for the order
router.post("/pay", function(req, res){
	//Update order with customer's chosen method
	stripe.orders.update(req.body.orderId, {
		selected_shipping_method : req.body.selectedShippingMethod.id
	}, function(err,updatedOrder){

		//Charge credit card callback
		stripe.orders.pay(req.body.orderId, {
			source : req.body.source
		}, function(err,paidOrder){


			// console.log("Paid order shipping id here", paidOrder.selected_shipping_method)
			// console.log(shippo.rate.retrieve(paidOrder.selected_shipping_method));
			// console.log("shippo.rate ",shippo.rate);

			
			// var shipment = shippo.shipment.retrieve(rate.shipment);
			// var parcel   = shippo.parcel.retrieve(shipment.parcel);

			// //Making Shipping label with shippo
			// var addressFrom  = {
			//     "name": "Jae Tran",
			//     "company": "From Jae",
			//     "street1": "Po Box 6282",
			//     "city": "Irvine",
			//     "state": "CA",
			//     "zip": "92616",
			//     "country": "US",
			//     "phone": "+1 714 837 4099",
			//     "email": "bhhuynh@ucsd.edu",
			// };

			// var addressTo = {
			// 	"name": order.shipping.name,
			//     "street1": order.shipping.address.line1,
			//     "city": order.shipping.address.city,
			//     "state": order.shipping.address.state,
			//     "zip": order.shipping.address.postal_code, 
			//     "country": order.shipping.address.country,
			//     "phone": order.shipping.phone,
			//     "email": order.email
			// };

			// //Update shipment info
			// shipment.address_from = addressFrom;
			// shipment.address_to   = addressTo;

			// //Request a shipping label
			// shippo.transaction.create({
			//     "shipment": shipment,
			//     "carrier_account": "078870331023437cb917f5187429b093",
			//     "servicelevel_token": "usps_priority"
			// }, function(err, transaction) {
			//     // asynchronously called
			//     console.log("Shipping label err", err);
			//     console.log("Shipping label transaction ", transaction)
			// });





		})
	})



})

//Creating an order according to cart
router.post("/cart", function(req, res){
	let cart = req.body.cart
	let stripeItems = cart.map(item=>({type:"sku", parent:item.sku, quantity:parseInt(item.purchaseQuantity), amount:parseFloat(item.price)*100, description:item.product_name}))

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
		console.log("Cart order here", order)
		res.json(order)
	})
})
// Otherwise send all other requests the index.html page
// React router will handle routing withing the app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});
module.exports = router;