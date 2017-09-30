var express = require("express");
var path = require("path");
var apiRoutes = require("./apiRoutes");
var authRoutes = require("./authRoutes");
var router = new express.Router();
var stripe = require("stripe")("sk_test_GWQwhFKlpRKUXR8MF7sikVBz");
var shippo = require('shippo')('shippo_test_7d3322dc54a6d8e3aa8f19dad3b4ae35a1620e8f');
var mailjet = require('node-mailjet').connect('518dc70c0a59bf49269b80dc95b04b9a', '88061bc5cc275d1643102d06d72eabf2');

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



			console.log("Paid Order ", paidOrder)
			//Making Shipping label with shippo
			var addressFrom  = {
			    "name": "Jae Tran",
			    "company": "From Jae",
			    "street1": "Po Box 6282",
			    "city": "Irvine",
			    "state": "CA",
			    "zip": "92616",
			    "country": "US",
			    "phone": "+1 714 837 4099",
			    "email": "bhhuynh@ucsd.edu",
			};

			var addressTo = {
				"name": paidOrder.shipping.name,
			    "street1": paidOrder.shipping.address.line1,
			    "city": paidOrder.shipping.address.city,
			    "state": paidOrder.shipping.address.state,
			    "zip": paidOrder.shipping.address.postal_code, 
			    "country": paidOrder.shipping.address.country,
			    "phone": paidOrder.shipping.phone,
			    "email": paidOrder.email
			};

			var parcel = {
				"length" : "12",
				"width" : "12",
				"height" : "12",
				"distance_unit": "in",
			    "weight": paidOrder.metadata.weight,
			    "mass_unit": "oz"
			}

			var shipment = {
			    "address_from": addressFrom,
			    "address_to": addressTo,
			    "parcels": [parcel],
			};


			shippo.carrieraccount.list({},function(err,data){
				console.log("carrieraccount data ", data);

				//Order/Create the label
				shippo.transaction.create({
				    "shipment": shipment,
				    "carrier_account": data.results[4].object_id,
				    "servicelevel_token": "usps_priority"
				}, function(err, transaction) {
				    // asynchronously called
				    console.log("Shippo error", err)
				    console.log("Shippo transaction", transaction)
				    mailjet
				    .post("send", {'version': 'v3.1'})
					    .request({
					        "Messages":[
					                {
					                        "From": {
					                                "Email": "huynhanhhoang1995@gmail.com",
					                                "Name": "Blake"
					                        },
					                        "To": [
					                                {
					                                        "Email": "jessselu@gmail.com",
					                                        "Name": paidOrder.shipping.name
					                                }
					                        ],
					                        "Subject": "Your fromJae tracking number",
					                        "TextPart": "Your order is being processed. Please check your tracking number to see updates",
					                        "HTMLPart": `<a href=${transaction.tracking_url_provider}>USPS tracking #</a>`
					                }
					        ]
					    })

				});
			});


		})
	})



})

//Creating an order according to cart
router.post("/cart", function(req, res){
	let cart = req.body.cart

	let totalWeight = req.body.cart.reduce((a,b)=>{return a + (b.weight*b.purchaseQuantity)},0)

	let stripeItems = cart.map(item=>({
		type:"sku", 
		parent:item.sku, 
		quantity:parseInt(item.purchaseQuantity), 
		amount:parseFloat(item.price)*100, 
		description:item.product_name,

	}))

	let stripeOrderCreate = {
		currency: "usd",
		items: stripeItems,
		metadata : {
			weight : totalWeight
		},
		shipping: {
			name: `${req.body.firstName} ${req.body.lastName}`,
			address: {
				line1: req.body.address,
				city: "san diego",
				state: req.body.state,
				country: "US",
				postal_code: req.body.zipCode
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