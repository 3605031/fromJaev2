import React from "react"
import NavButton from "./common/navbutton.js"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Toast} from "react-materialize"
import NavItemDropdown from "./common/navitemdropdown.js"

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this)
		this.state = {
			isOpen: false
		}
	}

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	getcartItems(){
		if (this.props.cart.length === 0) {
			return (
				<li>Your cart is empty. Add items to your cart!</li>
				)
		} else {
			let cart = this.props.cart
			cart.map(function(item){
			return(
				<NavItemDropdown item_name = {item.item_name} img_url = {item.img_url} quantity = {item.quantity} price = {item.price}/>
				)
			})
		}

	}

	render(){
		return(
			<div>

			
{/*			<!-- TOP INFO -->*/}
			<div className="top_info">
				
		{/*		<!-- CONTAINER -->*/}
				<div className="container clearfix contact" >
					<ul className="secondary_menu">
						<li><a href="#" >Log in</a></li>
						<li><a href="#" >Register</a></li>
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
						<a className="shopping_bag_btn" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i><p>shopping bag</p><span id="bagquantity">{this.props.totalQuantity}</span></a>
						<div className="cart">
							<ul className="cart-items cart-main">
								{this.cartItems}
							</ul>
							<div className="cart_total">
								<div className="clearfix"><span className="cart_subtotal">bag subtotal: <b className="bagtotal">{this.props.totalPrice}</b></span></div>
								<a className="btn active" href="checkout.html">Checkout</a>
							</div>
						</div>
					</div>{/*<!-- //SHOPPING BAG -->*/}
					
					
				{/*	<!-- LOVE LIST -->*/}
{/*					<div className="love_list">
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
					</div>
*/}
				{/*<!-- //LOVE LIST -->*/}
	

					<Nav className = "navmenu center">
						<NavButton propClass = "first active sub-menu" url="#" name="Home" />
						<NavButton propClass = "sub-menu" url="#" name="Figurine" />
						<NavButton propClass = "sub-menu" url="#" name="Stickers" />
						<NavButton propClass = "sub-menu" url="#" name="Jewelry" />
						<NavButton propClass = "last sub-menu" url="#" name="Sale" />
					</Nav>
				</div>{/*<!-- //MENU BLOCK -->*/}
			</div> {/*<!-- //CONTAINER -->*/}
		</div>
			)
	}
}
