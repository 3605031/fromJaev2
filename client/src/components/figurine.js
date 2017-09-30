import React, { Component } from 'react';
import update from "immutability-helper"
import Navbar from "./navbar.js"
import Featured from "./featuredProducts.js"
import NewArrival from "./newArrivals.js"
import Footer from "./Footer.js"
import API from "../utils/API.js"
import '../App.css';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
/*        this.props.handleAddToCart = this.handleAddToCart.bind(this)*/
        this.renderItems = this.renderItems.bind(this)
	}

	renderItems(){

		let newproducts = this.props.products.filter((item)=>item.featured)
		//eventully, dummyobj will be replaced with an API call to retrieve the items from database 
		return newproducts.map((toBeReplaced, index)=>{

			return(	
                <Item key={toBeReplaced._id} product_ID={toBeReplaced.product_ID} imgUrl={toBeReplaced.imgUrl} handleAddToCart={this.props.handleAddToCart} product_name={toBeReplaced.product_name} price={toBeReplaced.price} quantity={toBeReplaced.quantity} featuredIndex={index}/>
				)
		})
	}

	componentDidMount(){
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
			$('.some-class').on('click', function(e) {
				console.log('clicked something', e);
			});
		}
		if ( $ && window.tovarfotoHeight ) {
    		console.log('calling tovarfotoHeight')
        	tovarfotoHeight();
    	}
	}	

	componentDidUpdate(prevProps, prevState) {
		console.log('Figurine component, componentDidUpdate');
	}



  	render() {
	    return (
		    <div id="page">
		        <header>
		      		<Navbar totalPrice={this.props.totalPrice} totalQuantity={this.props.totalQuantity} cart={this.props.cart} cartItems={this.props.cartItems}/>
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

		        <NewArrival handleAddToCart={this.props.handleAddToCart} products={this.props.products}/>

		        <hr className="container"/>

		        <Footer/>
		    </div>  
	    );
  }
}

export default Home;
