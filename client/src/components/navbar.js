import React from "react"

import NavButton from "./common/navbutton.js";
import {Link} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Toast} from "react-materialize"
import NavItemDropdown from "./common/navitemdropdown.js"
import {Modal,OverlayTrigger,Button} from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom';


export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this)
		this.state = {
			isOpen: false,
		}


	}

	toggle(){
		if ($){
			$('.shopping_bag .cart').slideToggle()
			$('.shopping_bag .cart').parent().toggleClass('cart_active')
		}
	}


	numberItemsInCart = () => {
		return this.props.cart.length
	}

	render(){
		return(
			<div>

{/*			<!-- TOP INFO -->*/}
			<div className="top_info">
				
		{/*		<!-- CONTAINER -->*/}
				<div className="container clearfix contact" >
					
						{this.props.isAuthenticated?
						(<ul className="secondary_menu">	
						<li className="username">Welcome {this.props.firstName}!</li>
						<li><button>Sign Out</button></li>
						</ul>)
						:
						(<ul className="secondary_menu">
						<li><button onClick={this.props.openLogIn}>Log in</button></li>
						<li><button onClick={this.props.openSignUp}>Register</button></li>
						</ul>)}
						
					<div className="live_chat"><a href="javascript:void(0);" ><i className="fa fa-comment-o"></i> Live chat</a></div>
					
					<div className="phone_top">have a question? <a href="tel:1 800 888 2828" >1 800 888 2828</a></div>
				</div>{/*<!-- //CONTAINER -->*/}
			</div>{/*<!-- TOP INFO -->*/}
			
			
			{/*<!-- MENU BLOCK -->*/}
			<div className="menu_block">
			
			{/*	<!-- CONTAINER -->*/}
				<div className="container clearfix">
				<Modal show={this.props.showSignUpModal} onHide={this.props.closeSignUp}>
         			<Modal.Header closeButton>
            			<Modal.Title>Sign Up Form</Modal.Title>
          			</Modal.Header>

          			<Modal.Body>
            		    <form onSubmit={(e)=>this.props.onSubmit(e)} className="signup-form">
			                <div className="form-group">
			                    <label className="control-label">Username</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="text"
			                        name="username"
			                        className="form-control"
			                    />
			                </div>   

			                <div className="form-group">
			                    <label className="control-label">PW</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="password"
			                        name="password"
			                        className="form-control"
			                    />
			                </div>

			                <div className="form-group">
			                    <label className="control-label">Retype PW</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="password"
			                        name="passwordConfirmation"
			                        className="form-control"
			                    />
			                </div>

			                <div className="form-group">
			                    <label className="control-label">Email</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="text"
			                        name="email"
			                        className="form-control"
			                    />
			                </div> 
			                <div className="form-group row">
			                	<div className = "col-xs-6">
				                    <label className="control-label">First Name</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="firstName"
				                        className="form-control"
				                    />
				                </div>
			                	<div className = "col-xs-6">
				                    <label className="control-label">Last Name</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="lastName"
				                        className="form-control"
				                    />
				                </div>
		                	</div>

			                <div className="form-group row">
			                	<div className="col-xs-12">
				                    <label className="control-label">Address</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="address"
				                        className="form-control"
				                    />
			                    </div>
			                </div>
			                <div className="form-group row">
			                	<div className="col-xs-3">
				                    <label className="control-label">Zip Code</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="zipCode"
				                        className="form-control"
				                    />
				                 </div>
				                <div className="col-xs-2">
				                    <label className="control-label">State</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="state"
				                        className="form-control"
				                    />
				                </div>
				                <div className="col-xs-7">
				                    <label className="control-label">Phone Number</label>
				                    <input
				                        onChange={(e)=>this.props.onChange(e)}
				                        type="text"
				                        name="phoneNumber"
				                        className="form-control"
				                    />
				                </div>
			                </div>

			                <button className="btn btn-primary btn-lg">Signup</button>
            			</form>
          			</Modal.Body>
        		</Modal>

        		<Modal show={this.props.showLogInModal} onHide={this.props.closeLogIn}>
         			<Modal.Header closeButton>
            			<Modal.Title>Log In Form</Modal.Title>
          			</Modal.Header>

          			<Modal.Body>
            		    <form onSubmit={(e)=>this.props.loginSubmit(e)} className="signup-form">
			                <div className="form-group">
			                    <label className="control-label">Username</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="text"
			                        name="loginusername"
			                        className="form-control"
			                    />
			                </div>   

			                <div className="form-group">
			                    <label className="control-label">PW</label>
			                    <input
			                        onChange={(e)=>this.props.onChange(e)}
			                        type="password"
			                        name="loginpassword"
			                        className="form-control"
			                    />
			                </div>
			                <button className="btn btn-primary btn-lg">Login</button>
            			</form>
          			</Modal.Body>
        		</Modal>
					
	{/*				<!-- LOGO -->*/}
					<div className="logo">
						<a href="homepage.html" ><img src="images/logo2016.png" alt="" /></a>
					</div>{/*<!-- //LOGO -->*/}
					
					
		{/*			<!-- SEARCH FORM -->*/}
					<div className="top_search_form">
						<a className="top_search_btn" href="javascript:void(0);" ><i className="fa fa-search"></i></a>
						<form method="get" action="#">
							<input type="text" name="search" placeholder="Search"/>
						</form>
					</div>{/*<!-- SEARCH FORM -->*/}	
					
					
		{/*			<!-- SHOPPING BAG -->*/}
					<div className="shopping_bag">
						<a className="shopping_bag_btn" onClick={this.props.shoppingBag}><i className="fa fa-shopping-cart"></i><p>shopping bag</p><span id="bagquantity">{this.props.totalQuantity}</span></a>
						<div className="cart">
							<ul className="cart-items cart-main">
								{this.props.cartItems()}
							</ul>
							<div className="cart_total">
								<div className="clearfix"><span className="cart_subtotal">bag subtotal: <b className="bagtotal">${this.props.totalPrice()}</b></span></div>
								<Link to="/checkout" className="btn active">Checkout</Link>
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
						<NavItem className = "first active sub-menu" ><Link to="/">Home</Link></NavItem>
						<NavItem className = "sub-menu" ><Link to="/figurine">Figurine</Link></NavItem>
						<NavItem className = "sub-menu" ><Link to="/stickers">Stickers</Link></NavItem>
						<NavItem className = "sub-menu"><Link  to="/jewelry">Jewelry</Link></NavItem>
						<NavItem className = "last sub-menu"><Link  to="/sale">Sale</Link></NavItem>
					</Nav>
				</div>{/*<!-- //MENU BLOCK -->*/}
			</div> {/*<!-- //CONTAINER -->*/}
		</div>
			)
	}
}
