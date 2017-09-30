import React, { Component } from 'react';
import update from "immutability-helper"
import Navbar from "./navbar.js"
import Featured from "./featuredProducts.js"
import NewArrival from "./newArrivals.js"
import Footer from "./Footer.js"
import API from "../utils/API.js"
import '../App.css';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import Flexbox from "flexbox-react"
import Item from "./common/item.js"
import Toggle from "react-toggle"
import "react-toggle/style.css"


class Figurine extends Component {
	constructor(props) {
		super(props);
/*        this.props.handleAddToCart = this.handleAddToCart.bind(this)*/
		this.state ={
			figurines : []

		}
        this.renderItems = this.renderItems.bind(this)
        this.shoppingBag = this.shoppingBag.bind(this)
        this.getFigurines = this.getFigurines.bind(this)
        this.filterLow   = this.filterLow.bind(this)
        this.filterHigh   = this.filterHigh.bind(this)
	}

	getFigurines(){
		API.getFigurines()
			.then(res =>{
				this.setState((prevState)=>{
					return {
						figurines: res.data 
					}
				})
			})
			.then(()=>{
				if ( $ && window.tovarfotoHeight ) {
		    		console.log('calling tovarfotoHeight')
		        	tovarfotoHeight();
    			}
			})
			.catch(err => console.log(err))
	}

	renderItems(){

		return this.state.figurines.map((toBeReplaced, index)=>{

			return(	
                <Item key={toBeReplaced._id} product_ID={toBeReplaced.product_ID} imgUrl={toBeReplaced.imgUrl} handleAddToCart={this.props.handleAddToCart} product_name={toBeReplaced.product_name} price={toBeReplaced.price} quantity={toBeReplaced.quantity} featuredIndex={index}/>
				)
		})
		tovarfotoHeight()
	}

	setStateOnUpdate(){
		let figurines = this.props.products.filter((item)=>item.product_category === "Figurine")
		console.log("figurines are",figurines)	
		this.setState({
			fromProps: figurines
		})
		return 	
	}

	componentDidMount(){	
		this.getFigurines()			
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
			jQuery('')
		}

		if ( $ && window.tovarfotoHeight ) {
    		console.log('calling tovarfotoHeight')
        	tovarfotoHeight();
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


	componentWillUpdate(nextProps, nextState) {
		const script1 = document.createElement("script");
        script1.src = "./js/jquery.jcarousel.js";
        script1.async = true;

        const script2 = document.createElement("script");
        script2.src = "./js/myscript.js";
        script2.async = true;

        document.body.appendChild(script1);
        document.body.appendChild(script2);
	}

	filterLow(){

		let lowSort = this.state.figurines.sort(function(a, b) {
		    return parseFloat(a.price) - parseFloat(b.price);
		});
		this.setState({
			figurines : lowSort
		})
	}

	filterHigh(){

		let highSort = this.state.figurines.sort(function(a, b) {
		    return parseFloat(b.price) - parseFloat(a.price);
		});
		this.setState({
			figurines : highSort
		})
	}



  	render() {
	    return (
		    <div id="page">
		        <header>
		      		<Navbar shoppingBag={this.shoppingBag} totalPrice={this.props.totalPrice} totalQuantity={this.props.totalQuantity} cart={this.props.cart} cartItems={this.props.cartItems}/>
		        </header>


				<section id="home" className="padbot0">		
					<div className="flexslider top_slider">
						<ul className="slides">
							<li className="slide1">	
							</li>
						</ul>
					</div>
				</section>
{/*		        <section className = "filter_bar">
		        	<label><Toggle defaultChecked = {this.state.filterByPrice} checked={this.filterByPrice}/>Sort by Price</label>
		        </section>*/}
				<section className="tovar_section">
					{/*<!-- CONTAINER -->*/}
					<div className="container">
						<div className="row">
							<h2 id="feature_title">Figurines </h2>
							<button onClick={this.filterHigh} className="btn btn-sm sort">Sort by Highest</button> 
							<button onClick={this.filterLow} className="btn btn-sm sort">Sort by Lowest</button>
						</div>
						
						{/*<!-- ROW -->*/}
						<Flexbox>
							<Flexbox className="tovar_wrapper" data-appear-top-offset='-100' data-animated='fadeInUp' style={{flexWrap:"wrap"}}>
								{this.renderItems()}
							</Flexbox>
						</Flexbox>				
					</div>{/*<!-- CONTAINER -->*/}
				</section>


		        <hr className="container"/>

		        <Footer/>
		    </div>  
	    );
  }
}

export default Figurine;
