

$(document).ready(function() {
  //Temporary Solution for Dom images load without React
  
  function localLength(arr){
    
  }
  
  //FEATURED ITEM data attachments
  function updatePage(){   
    $.ajax({
      url: "/api/all",
      method: "GET"
    }).done(function(data) {
      
      for(var i=0; i < 8; i++){
        
        $('.feature_item'+i).find('img').attr("src",data[i].url);
        $('.feature_item_title'+i).html(data[i].product_name);
        //Put in $00.00 format
        $('.feature_item_price'+i).html("$"+parseFloat(Math.round(data[i].price * 100) / 100).toFixed(2));
        $('.feature_item_quantity'+i).html("Quantity: "+data[i].quantity);
      };
    });
    var a = JSON.parse(localStorage.getItem("cart"));
    if(a!= null){
      var bagquantity = 0;
      for(var y=0; y < a.length; y++){
        if(y == 0){  
          $(".cart-main").html(
            '<li class="clearfix">'
            +	'<img class="cart_item_product" src="'+ a[y].url + '"alt="" />'
            +	'<a href="product-page.html" class="cart_item_title">'+ a[y].name + '</a>'
            +	'<span class="cart_item_price">'+ a[y].quantity + '× $'+ parseFloat(Math.round(a[y].price * 100) / 100).toFixed(2)+'</span>'
            + '</li>'
          );
        } else{
          $(".cart-main").append(
            '<li class="clearfix">'
            +	'<img class="cart_item_product" src="'+ a[y].url + '"alt="" />'
            +	'<a href="product-page.html" class="cart_item_title">'+ a[y].name + '</a>'
            +	'<span class="cart_item_price">'+ a[y].quantity + '× $'+ parseFloat(Math.round(a[y].price * 100) / 100).toFixed(2)+'</span>'
            + '</li>'
          );
        }
        bagquantity += parseInt(a[y].quantity);
      }
      $("#bagquantity").text(bagquantity);
      $(".bagtotal").html("$"+localStorage.getItem('cartsum'));
    } 
  }
  
  updatePage();
  //Adding Items to Shopping Bag from Featured Item and saving data to local storage
  
  $(".add_bag").click(function(){
    var item_name = $(this).parent().parent().parent().find(".tovar_description").find(".tovar_title").text().trim();
    var item_quantity = $(this).parent().parent().parent().find(".tovar_description").find(".tovar_quantity").text().trim();
    item_quantity = parseInt(item_quantity.replace(/[^0-9\.]/g, ''), 10);
    if(item_quantity>0){
      $(this).parent().parent().parent().find(".tovar_description").find(".tovar_quantity").text("Quantity: "+(item_quantity-1));
      var bagnum = parseInt($("#bagquantity").text());
      bagnum++;
      $("#bagquantity").text(bagnum);
    }
    $.ajax({
      url: "/item/"+item_name,
      method: "GET"
    }).done(function(data) {
      if(item_quantity == 0){
        Materialize.toast("Sorry! Seems we're out of stock. Check back later", 3000);
      }
      //Double check quantity from server 
      else if(data[0].quantity==0) {
        Materialize.toast("Sorry! Seems we're out of stock. Check back later", 3000);
      }
      else if(data[0].quantity>0){
        Materialize.toast('Added to Cart!', 2000);
        //Adding shopping cart to local storage
        var localcart = localStorage.getItem("cart");
        var a = [];
        if(localcart == undefined){
          //Create a new one if it doesn't exist
          a.push({name: data[0].product_name,
            quantity: 1,
            url: data[0].url,
            price: data[0].price});
            
            localStorage.setItem('cart', JSON.stringify(a));
            console.log("new shopping cart created");
          } else {
            //Get cart from local storage if exist
            a = JSON.parse(localStorage.getItem("cart"));
            
            var done = false;
            
            
            for(var i = 0; i < a.length; i++){
              if(a[i].name ==data[0].product_name ){
                a[i].quantity++;
                done = true;
                
              }
            }
            //If everything is good, add to local storage/
            if(done == false){
              a.push({name:data[0].product_name,
                quantity: 1,
                url: data[0].url,
                price: data[0].price});
                localStorage.setItem('cart', JSON.stringify(a));
              } else {
                localStorage.setItem('cart', JSON.stringify(a));
              }
            }
            
            //Add to cart dropdown
            console.log("cart length: "+a.length)
            a = JSON.parse(localStorage.getItem("cart"));
            var cart_sum = 0;
            for(var y=0; y < a.length; y++){
              if(y == 0){  
                $(".cart-main").html(
                  '<li class="clearfix">'
                  +	'<img class="cart_item_product" src="'+ a[y].url + '"alt="" />'
                  +	'<a href="product-page.html" class="cart_item_title">'+ a[y].name + '</a>'
                  +	'<span class="cart_item_price">'+ a[y].quantity + '× $'+ parseFloat(Math.round(a[y].price * 100) / 100).toFixed(2)+'</span>'
                  + '</li>'
                );
              } else{
                $(".cart-main").append(
                  '<li class="clearfix">'
                  +	'<img class="cart_item_product" src="'+ a[y].url + '"alt="" />'
                  +	'<a href="product-page.html" class="cart_item_title">'+ a[y].name + '</a>'
                  +	'<span class="cart_item_price">'+ a[y].quantity + '× $'+ parseFloat(Math.round(a[y].price * 100) / 100).toFixed(2)+'</span>'
                  + '</li>'
                );
              }
              cart_sum += parseFloat(a[y].price) * parseInt(a[y].quantity);
              console.log(cart_sum);
            }
            localStorage.setItem('cartsum',cart_sum); 
            $(".bagtotal").html("$"+localStorage.getItem('cartsum'))
          }
        });
      })
      
      
      
    });
    