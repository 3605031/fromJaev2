/********************First Checkout**********************/
var a = JSON.parse(localStorage.getItem("cart"));
console.log(a);
var cart_sum=0;
for(var i=0;i<a.length;i++){
    if(i==0){
        $(".checkout_body").html(
            '<tr class="cart_item '+a[i].name +'">'
            +								'<td class="product-thumbnail"><a href="product-page.html" ><img src='+a[i].url +'"width="100px" alt="" /></a></td>'
            +								'<td class="product-name">'
            +									'<a href="product-page.html">'+a[i].name+'</a>'
            +									'<ul class="variation">'
            +									'</ul>'
            +								'</td>'
            
            +								'<td class="product-price">$'+a[i].price+'</td>'
            
            +								'<td class="product-quantity">'
            +								'<b class="checkout_quantity">'+a[i].quantity+'</b'
            +								'</td>'
            
            +								'<td class="product-subtotal">$'+parseFloat(a[i].price)*parseInt(a[i].quantity)+'</td>'
            
            +								'<td class="product-remove"><a href="javascript:void(0);" ><span>Delete</span> <i class="cart_delete" id="'+a[i].name+'">X</i></a></td>'
            +							'</tr>')
        } else {
            $(".checkout_body").append(
                '<tr class="cart_item '+a[i].name +'">'
            +								'<td class="product-thumbnail"><a href="product-page.html" ><img src='+a[i].url +'"width="100px" alt="" /></a></td>'
            +								'<td class="product-name">'
            +									'<a href="product-page.html">'+a[i].name+'</a>'
            +									'<ul class="variation">'
            +									'</ul>'
            +								'</td>'
            
            +								'<td class="product-price">$'+a[i].price+'</td>'
            
            +								'<td class="product-quantity">'
            +								'<b class="checkout_quantity">'+a[i].quantity+'</b'
            +								'</td>'
            
            +								'<td class="product-subtotal">$'+parseFloat(a[i].price)*parseInt(a[i].quantity)+'</td>'
            
            +								'<td class="product-remove"><a href="javascript:void(0);" ><span>Delete</span>  <i class="cart_delete" id="'+a[i].name+'">X</i></a></td>'
            +							'</tr>'
        )
    }
    cart_sum += parseFloat(a[i].price) * parseInt(a[i].quantity);
    localStorage.setItem('cartsum',cart_sum);
}


$(".checkout_subtotal").html("$"+localStorage.getItem('cartsum'));

$(".cart_delete").click(function(){
    var productname = event.target.id;
    //remove from cart table
    $("."+productname).remove();
    //remove from local storage
    var localcart = JSON.parse(localStorage.getItem("cart"));
    var index;
    console.log(localcart);
    for(var i = 0; i < localcart.length;i++){
        if(localcart[i].name == productname){
            index = i;
        }
    }
    localcart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(localcart));
})