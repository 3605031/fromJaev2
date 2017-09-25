import React, { Component } from 'react';
import update from "immutability-helper"
import Home from "./components/Home.js"
import Checkout from "./components/Checkout.js"
import API from "./utils/API.js"
import './App.css';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],

			cart: [] //price, quantity, imgUrl, product_name			
		}
		this.handleAddToCart = this.handleAddToCart.bind(this)
		this.addToCart       = this.addToCart.bind(this)
	}


	componentDidMount(){
		this.getAll();
		console.log(this.state.products)

	}	

	getAll(){
		API.searchAll()
			.then(res =>{
				console.log(res)
				this.setState((prevState)=>{
					console.log(prevState)
					return {
						products: res.data 
					}
				})
			})
			.then(()=>{
				console.log(this.state)
			})
			.catch(err => console.log(err))
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

	addToCart(item){

		item.quantity = 1;
		let newCart = this.state.cart
		let newitem = true;

		console.log("current state cart : " + JSON.stringify(this.state.cart))
		console.log("item to be added :", item);

		if(newCart.length == 0){
			newCart.push(item)
			console.log("New Cart ", newCart)
			this.setState({cart:newCart})
		} else {
			newCart.forEach(function(currentItem,index){
				if(currentItem.product_name == item.product_name){
					currentItem.quantity++
					newitem = false	
				}
			})
			if(newitem){
				newCart.push(item);
				this.setState({cart:newCart})
			}
		}
		console.log("new Cart", JSON.stringify(this.state.cart));
	}

	removeFromCart(event, item){
		event.preventDefault()
		let removedItem = item
		this.setState(prevState=>({
			cart: prevState.cart.filter(cart =>{return cart !== removedItem})
		}))
	}	



    handleAddToCart(event, addItem){
        console.log("add to cart button works")
        let newCart = this.state.products.filter(item=>item.product_ID === addItem)
        this.addToCart(newCart[0])
    }



  	render() {
	    return (
		    <Router>
    			<div>
	        		<Route exact path="/" render={()=><Home cart={this.state.cart} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/checkout" component={Checkout}/>
        		</div>
    		</Router>
	    );
  }
}

export default App;
