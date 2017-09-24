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
			showSignUpModal: false,
			showLogInModal : false,
			username: '',
      		email: '',
      		password: '',
      		passwordConfirmation: '',
      		loginusername: '',
      		loginpassword: '',
      		isAuthenticated: false,
      		token: ''
		}
		this.closeSignUp = this.closeSignUp.bind(this);
		this.closeLogIn  = this.closeLogIn.bind(this);
		this.openLogIn   = this.openLogIn.bind(this);
		this.openSignUp  = this.openSignUp.bind(this);
		this.onChange    = this.onChange.bind(this);
    	this.onSubmit    = this.onSubmit.bind(this);
    	this.loginSubmit = this.loginSubmit.bind(this);
	}

	closeSignUp() {
    	this.setState({ showSignUpModal: false });
  	}

  	closeLogIn(){
  		this.setState({ showLogInModal:false})
  	}

  	openSignUp() {
    	this.setState({ showSignUpModal: true });
  	}

  	openLogIn(){
  		this.setState({ showLogInModal: true})
  	}

  	onChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}


  	onSubmit(e) {
    	e.preventDefault();
    	if(this.state.username==''||this.state.password==''){
        	alert("Fill out username and PW")
    	} else {
        	if(this.state.password != this.state.passwordConfirmation){
            	alert("PW must match")
        	} else {
            axios.post("/auth/signup",this.state)
                .then(  (response) => {
                    console.log(response.data.success == true);
                    if(response.data.success == true){
                        alert("You signed up successfully!");
                        this.closeSignUp();
                    }
                })
                    .catch(function (error) {console.log(error)})
        	}
    	}
    }

    loginSubmit(e){
    	e.preventDefault();
    	if(this.state.loginusername==''||this.state.loginpassword==''){
    		alert("Fill out username and PW")
    	} else {
    		console.log("You're logging in")
    		var info = {
    			username : this.state.loginusername,
    			password : this.state.loginpassword
    		}
    		axios.post("/auth/login",info)
    				.then((response) => {
    					console.log("Login response",response)
    					if(response.data.success==true){
    						this.setState({isAuthenticated:true});
                        	this.setState({token:response.data.token})
                        	this.closeLogIn();
    					} else {
    						alert("Your credentials are wrong");
    					}
    				})
    					.catch((err)=>console.log(err));
    	}

    }

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}


	get cartItems(){
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
					
						{this.state.isAuthenticated?
						(<ul className="secondary_menu">	
						<li className="username">Welcome {this.state.loginusername}!</li>
						<li><button>Sign Out</button></li>
						</ul>)
						:
						(<ul className="secondary_menu">
						<li><button onClick={this.openLogIn}>Log in</button></li>
						<li><button onClick={this.openSignUp}>Register</button></li>
						</ul>)}
						
					<div className="live_chat"><a href="javascript:void(0);" ><i className="fa fa-comment-o"></i> Live chat</a></div>
					
					<div className="phone_top">have a question? <a href="tel:1 800 888 2828" >1 800 888 2828</a></div>
				</div>{/*<!-- //CONTAINER -->*/}
			</div>{/*<!-- TOP INFO -->*/}
			
			
			{/*<!-- MENU BLOCK -->*/}
			<div className="menu_block">
			
			{/*	<!-- CONTAINER -->*/}
				<div className="container clearfix">
				<Modal show={this.state.showSignUpModal} onHide={this.closeSignUp}>
         			<Modal.Header closeButton>
            			<Modal.Title>Sign Up Form</Modal.Title>
          			</Modal.Header>

          			<Modal.Body>
            		    <form onSubmit={this.onSubmit} className="signup-form">
			                <div className="form-group">
			                    <label className="control-label">Username</label>
			                    <input
			                        onChange={this.onChange}
			                        type="text"
			                        name="username"
			                        className="form-control"
			                    />
			                </div>   

			                <div className="form-group">
			                    <label className="control-label">PW</label>
			                    <input
			                        onChange={this.onChange}
			                        type="password"
			                        name="password"
			                        className="form-control"
			                    />
			                </div>

			                <div className="form-group">
			                    <label className="control-label">Retype PW</label>
			                    <input
			                        onChange={this.onChange}
			                        type="password"
			                        name="passwordConfirmation"
			                        className="form-control"
			                    />
			                </div>

			                <div className="form-group">
			                    <label className="control-label">Email</label>
			                    <input
			                        onChange={this.onChange}
			                        type="text"
			                        name="email"
			                        className="form-control"
			                    />
			                </div> 
			                <button className="btn btn-primary btn-lg">Signup</button>
            			</form>
          			</Modal.Body>
        		</Modal>

        		<Modal show={this.state.showLogInModal} onHide={this.closeLogIn}>
         			<Modal.Header closeButton>
            			<Modal.Title>Log In Form</Modal.Title>
          			</Modal.Header>

          			<Modal.Body>
            		    <form onSubmit={this.loginSubmit} className="signup-form">
			                <div className="form-group">
			                    <label className="control-label">Username</label>
			                    <input
			                        onChange={this.onChange}
			                        type="text"
			                        name="loginusername"
			                        className="form-control"
			                    />
			                </div>   

			                <div className="form-group">
			                    <label className="control-label">PW</label>
			                    <input
			                        onChange={this.onChange}
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
						<NavButton propClass = "first active sub-menu" url={this.props.toggleHome} name="Home" />
						<NavButton propClass = "sub-menu" url={this.props.toggleFigurines} name="Figurine" />
						<NavButton propClass = "sub-menu" url={this.props.toggleStickers} name="Stickers" />
						<NavButton propClass = "sub-menu" url={this.props.toggleJewelry} name="Jewelry" />
						<NavButton propClass = "last sub-menu" url={this.props.toggleSale} name="Sale" />
					</Nav>
				</div>{/*<!-- //MENU BLOCK -->*/}
			</div> {/*<!-- //CONTAINER -->*/}
		</div>
			)
	}
}
