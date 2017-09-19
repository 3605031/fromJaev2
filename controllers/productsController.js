// server side code to calculate shipping, tax, total price for subtotal and toal
// take in an object of {name, quantity} to return {total price, tax, shipping, quantity, name}
//shippo and stripe? 


var Product = require("../models/product");
module.exports = {
  // This method handles retrieving articles from the db
  index: function(req, res) {
   Product.find()
      .then(function(doc) {
        res.json(doc);
      }).catch(function(err) {
        res.json(err);
      });
  }
};