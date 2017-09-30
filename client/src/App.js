import React, { Component } from 'react';
import update from "immutability-helper"
import Home from "./components/Home.js"
import Figurine from "./components/figurine.js"
import Jewelry from "./components/jewelry.js"
import Stickers from "./components/stickers.js"
import Sale from "./components/sale.js"
import Checkout from "./components/Checkout.js"
import UserForm from "./components/userinformationpage.js"
import API from "./utils/API.js"
import './App.css';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import NavItemDropdown from "./components/common/navitemdropdown.js"

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			cart: [] //price, quantity, imgUrl, product_name			
		}
		this.handleAddToCart = this.handleAddToCart.bind(this)
		this.addToCart       = this.addToCart.bind(this)
    	this.cartItems = this.cartItems.bind(this)
    	this.totalPrice = this.totalPrice.bind(this)
    	this.removeFromCart = this.removeFromCart.bind(this)

	}


	componentDidMount(){
		this.getAll();
		console.log(this.state.products);
		if ( $ && window.tovarfotoHeight ) {
		        	tovarfotoHeight();
    	}

	}	

	getAll(){
		API.searchAll()
			.then(res =>{
				this.setState((prevState)=>{
					return {
						products: res.data 
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


	cartItems(){
		if (this.state.cart.length === 0) {
			return (
				<li>Your cart is empty. Add items to your cart!</li>
				)
		} else {
			return this.state.cart.map((item)=>{
				return(
					<NavItemDropdown product_name = {item.product_name} imgUrl = {item.imgUrl} quantity = {item.purchaseQuantity} price = {item.price} key={item._id}/>
					)
				})
		}

	}

	totalPrice(){
		return (this.state.cart.length === 0) ? 0 : this.state.cart.reduce((a,b)=>{return a + (b.price*b.purchaseQuantity)},0)
	}

	get totalQuantity(){
		return this.state.cart.length
	}

	addToCart(item){

		let newCart = this.state.cart
		let newitem = true;

		if(newCart.length == 0){
			item.purchaseQuantity = 1;
			newCart.push(item)
			this.setState({cart:newCart})
		} else {
			newCart.forEach(function(currentItem,index){
				if(currentItem.product_name == item.product_name){
					currentItem.purchaseQuantity++
					newitem = false	
				}
			})
			this.setState({cart:newCart});
			if(newitem){
				item.purchaseQuantity = 1
				newCart.push(item);
				this.setState({cart:newCart})
			}
		}
	}

	removeFromCart = (data) => {
		console.log("Removing from cart: ", data);
		var newCart = this.state.cart.filter((item) => item._id!=data);
		this.setState({
			cart: newCart
		})
	}	



    handleAddToCart(event, addItem){

		let newProducts = this.state.products;
        let newCart = this.state.products.filter(item=>item.product_ID === addItem)
        let test = newCart
        let index = this.state.products.indexOf(test[0]);

        console.log("index of item: ",index)
        console.log("newProducts quantity",newProducts[index].quantity)
        newProducts[index].quantity--
        console.log("After subtracting ", newProducts[index].quantity)
   		this.setState({
   			products : newProducts
   		})

        this.addToCart(newCart[0])
    }


  	render() {
	    return (
		    <Router>
    			<div>
	        		<Route exact path="/" render={()=><Home cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/checkout" render={()=><Checkout removeFromCart={this.removeFromCart} cart={this.state.cart} totalPrice={this.totalPrice}/>}/>
	        		<Route exact path = "/userinfo" render={()=><UserForm totalPrice = {this.totalPrice} cart={this.state.cart}/>}/>
	        		<Route exact path="/figurine" render={()=><Figurine cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/jewelry" render={()=><Jewelry cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/stickers" render={()=><Stickers cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/sale" render={()=><Sale cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
        		</div>
    		</Router>
	    );
  }
}

export default App;
