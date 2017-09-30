import React, { Component } from 'react';
import update from "immutability-helper"
import Navbar from "./navbar.js"
import Featured from "./featuredProducts.js"
import NewArrival from "./newArrivals.js"
import Instagram from "./Instagram.js"
import Footer from "./Footer.js"
import API from "../utils/API.js"
import '../App.css';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newArrivals:false
		}
		this.shoppingBag = this.shoppingBag.bind(this);
	}


	componentWillMount(){
		if ( $ && window.tovarfotoHeight ) {
    		console.log('calling tovarfotoHeight')
        	tovarfotoHeight();
    	}
	}

	componentDidMount(){

		const script1 = document.createElement("script");
        script1.src = "./js/jquery.jcarousel.js";
        script1.async = true;
        document.body.appendChild(script1);

		console.log(this.props.cart)
		if ( $ && $.flexslider ) {
			$('.flexslider.top_slider').flexslider({
				animation: "fade",
				controlNav: true,
				directionNav: false,
				prevText: "",
				nextText: ""
			});
		}
		if ( $ ) {
			jQuery('.shopping_bag .cart').slideUp(1);
			jQuery('.top_search_form form').slideUp(1);
		}
    }


	shoppingBag(){
		if($){
			jQuery(document).ready(function() {
				jQuery('.shopping_bag .cart').slideToggle();
				jQuery('.shopping_bag .cart').parent().toggleClass('cart_active');
			})
		}
	}	

/*	componentWillUpdate(nextProps, nextState) {
		const script1 = document.createElement("script");
        script1.src = "./js/jquery.jcarousel.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "./js/myscript.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);
	}*/

	renderItems = () => {
		return(
			<ul>
			{this.props.products.reduce((newItems, product)=>{
				if (product.new){
					newItems.push(<li key={product.product_ID}>
						{/*<!-- TOVAR -->*/}
						<div className="tovar_item_new">
							<div className="tovar_img">
								<img src={product.imgUrl} alt="" />
								<div className="open-project-link"><a className="open-project tovar_view" href="javascript:void(0);" data-url="!projects/women/1.html" >quick view</a></div>
							</div>
							<div className="tovar_description clearfix">
								<a className="tovar_title" href="product-page.html" >{product.product_name}</a>
								<span className="tovar_price">{"$" + product.price}</span>
							</div>
						</div>{/*<!-- //TOVAR -->*/}
					</li>)
				}
				
				return newItems
					
			}, [])}
			</ul>
		)
	}

  	render() {
	    return (
		    <div id="page">

		        <header>
		      		<Navbar showSignUpModal = {this.props.showSignUpModal} showLogInModal = {this.props.showLogInModal} closeSignUp = {this.props.closeSignUp} closeLogIn = {this.props.closeLogIn} openSignUp = {this.props.openSignUp} openLogIn = {this.props.openLogIn} firstName = {this.props.firstName} isAuthenticated = {this.props.isAuthenticated} onSubmit = {this.props.onSubmit} loginSubmit = {this.props.loginSubmit} onChange = {this.props.onChange}  shoppingBag={this.shoppingBag} totalPrice={this.props.totalPrice} totalQuantity={this.props.totalQuantity} cart={this.props.cart} cartItems={this.props.cartItems}/>
		        </header>


				<section id="home" className="padbot0">		
					<div className="flexslider top_slider">
						<ul className="slides">
							<li className="slide1">	
							</li>
						</ul>
					</div>
				</section>
		        
		        <Featured handleAddToCart={this.props.handleAddToCart} products={this.props.products}/>

		        <section className="new_arrivals padbot50">
			
			{/*<!-- CONTAINER -->*/}
			<div className="container">
				<h2>new arrivals</h2>
				
				{/*<!-- JCAROUSEL -->*/}
				<div className="jcarousel-wrapper">
					
					{/*<!-- NAVIGATION -->*/}
					<div className="jCarousel_pagination">
						<a href="javascript:void(0);" className="jcarousel-control-prev" ><i className="fa fa-angle-left"></i></a>
						<a href="javascript:void(0);" className="jcarousel-control-next" ><i className="fa fa-angle-right"></i></a>
					</div>{/*<!-- //NAVIGATION -->*/}
					
					<div className="jcarousel" data-appear-top-offset='-100' data-animated='fadeInUp'>
						{this.renderItems()}
					</div>
				</div>{/*<!-- //JCAROUSEL -->*/}
			</div>
	{/*<!-- //NEW ARRIVALS -->*/}</section>

		        <hr className="container"/>

		        <Instagram/>

		        <Footer/>
		    </div>  
	    );
  }
}

export default Home;
