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
	
		}
	}


	componentDidMount(){
		console.log(this.props.cart)
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

		        <Instagram/>

		        <Footer/>
		    </div>  
	    );
  }
}

export default Home;
