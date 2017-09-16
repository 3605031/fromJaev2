import React, { Component } from 'react';
import Navbar from "./components/navbar.js"
import Featured from "./components/featuredProducts.js"
import NewArrival from "./components/newArrivals.js"
import Instagram from "./components/Instagram.js"
import Footer from "./components/Footer.js"
import './App.css';
	
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [] //price, quantity, imgUrl, product_name  		
		}
		
	}

get totalPrice(){
	if (this.state.cart.length ===0){
		return 0
	} else {
		let sumCart = this.state.cart
		let sum = sumCart.reduce((a,b)=>{return a.price+b.price},0)
		return sum
	}
}

get totalQuantity(){
	return this.state.cart.length
}


//need to write getCartChangeHandler function as props to pass down to children

  render() {
    return (
    <div id="page">

        <header>
      		<Navbar totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} cart={this.state.cart}/>
        </header>

		<section id="home" className="padbot0">		
			<div className="flexslider top_slider">
				<ul className="slides">
					<li className="slide1">	
					</li>
				</ul>
			</div>
		</section>
        
        <Featured/>

        <NewArrival/>

        <hr className="container"/>

        <Instagram/>

        <Footer/>
    </div>  
    );
  }
}

export default App;
