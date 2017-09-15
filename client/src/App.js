import React, { Component } from 'react';
import Navbar from "./components/navbar.js"
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [] //price, quantity, img_url, item_name  		
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


  render() {
    return (
      <Navbar totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} cart={this.state.cart}/>
    );
  }
}

export default App;
