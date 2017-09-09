import React from "react"

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(

			<div>

			
{/*			<!-- TOP INFO -->*/}
			<div className="top_info">
				
		{/*		<!-- CONTAINER -->*/}
				<div className="container clearfix contact" >
					<ul className="secondary_menu">
						<li><a href="./login" >Log in</a></li>
						<li><a href="my-account.html" >Register</a></li>
					</ul>
					
					<div className="live_chat"><a href="javascript:void(0);" ><i className="fa fa-comment-o"></i> Live chat</a></div>
					
					<div className="phone_top">have a question? <a href="tel:1 800 888 2828" >1 800 888 2828</a></div>
				</div>{/*<!-- //CONTAINER -->*/}
			</div>{/*<!-- TOP INFO -->*/}
			
			
			{/*<!-- MENU BLOCK -->*/}
			<div className="menu_block">
			
			{/*	<!-- CONTAINER -->*/}
				<div className="container clearfix">
					
	{/*				<!-- LOGO -->*/}
					<div className="logo">
						<a href="homepage.html" ><img src="images/logo2016.png" alt="" /></a>
					</div>{/*<!-- //LOGO -->*/}
					
					
		{/*			<!-- SEARCH FORM -->*/}
					<div className="top_search_form">
						<a className="top_search_btn" href="javascript:void(0);" ><i className="fa fa-search"></i></a>
						<form method="get" action="#">
							<input type="text" name="search" value="Search"/>
						</form>
					</div>{/*<!-- SEARCH FORM -->*/}
					
					
		{/*			<!-- SHOPPING BAG -->*/}
					<div className="shopping_bag">
						<a className="shopping_bag_btn" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i><p>shopping bag</p><span id="bagquantity">0</span></a>
						<div className="cart">
							<ul className="cart-items cart-main">
{/*								<!-- <li className="clearfix">
									<img className="cart_item_product" src="images/tovar/women/nomnom.jpg" alt="" />
									<a href="product-page.html" className="cart_item_title">popover sweatshirt in floral jacquard</a>
									<span className="cart_item_price">1 × $98.00</span>
								</li>
								<li className="clearfix">
									<img className="cart_item_product" src="images/tovar/women/3.jpg" alt="" />
									<a href="product-page.html" className="cart_item_title">japanese indigo denim jacket</a>
									<span className="cart_item_price">2 × $158.00</span>
								</li> -->*/}
							</ul>
							<div className="cart_total">
								<div className="clearfix"><span className="cart_subtotal">bag subtotal: <b className="bagtotal">$414</b></span></div>
								<a className="btn active" href="checkout.html">Checkout</a>
							</div>
						</div>
					</div>{/*<!-- //SHOPPING BAG -->*/}
					
					
				{/*	<!-- LOVE LIST -->*/}
					<div className="love_list">
						<a className="love_list_btn" href="javascript:void(0);" ><i className="fa fa-heart-o"></i><p>Love list</p><span>0</span></a>
						<div className="cart">
							<ul className="cart-items">
								<li>Cart is empty</li>
							</ul>
							<div className="cart_total">
								<div className="clearfix"><span className="cart_subtotal">bag subtotal: <b>$0</b></span></div>
								<a className="btn active" href="checkout.html">Checkout</a>
							</div>
						</div>
					</div>{/*<!-- //LOVE LIST -->*/}
					
					{/*
					<!-- MENU -->*/}
					<ul className="navmenu center">
						<li className="sub-menu first active"><a href="javascript:void(0);" >Home</a>
					
						</li>
						<li className="sub-menu"><a href="javascript:void(0);" >Figurine</a>
						</li>
						<li className="sub-menu"><a href="javascript:void(0);" >Pins</a>
						</li>
						<li className="sub-menu"><a href="shoes.html" >Stickers</a></li>
						<li className="sub-menu"><a href="shoes.html" >Jewelry</a></li>
						
						<li className="last sale_menu"><a href="sale.html" >Sale</a></li>
					</ul>{/*<!-- //MENU -->*/}
				</div>{/*<!-- //MENU BLOCK -->*/}
			</div> {/*<!-- //CONTAINER -->*/}
		</div>
			)
	}
}
