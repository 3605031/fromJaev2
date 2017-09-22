

//get all info for one item 

//get all info for all favorited items

//get all info for all items in shopping cart , pass array of objects {name, quantity}

//save cart and favorites to user info 

//passport? login authentication 

var express = require("express")
var router = new express.Router()
var productsController = require("../controllers/productsController");

// Get all products
router.get("/all", productsController.index)

//get catergorized products
router.get("/pins",productsController.pins)

router.get("/figurines",productsController.figurines)

router.get("/jewelry",productsController.jewelry)






module.exports = router;