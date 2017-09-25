import React, { Component } from 'react';
import update from "immutability-helper"
import Home from "./components/Home.js"
import Checkout from "./components/Checkout.js"
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


	cartItems(){
		if (this.state.cart.length === 0) {
			return (
				<li>Your cart is empty. Add items to your cart!</li>
				)
		} else {
			return this.state.cart.map((item)=>{
				return(
					<NavItemDropdown product_name = {item.product_name} imgUrl = {item.imgUrl} quantity = {item.quantity} price = {item.price} product_ID={item.product_ID}/>
					)
				})
		}

	}

	totalPrice(){
		return (this.state.cart.length === 0) ? 0 : this.state.cart.reduce((a,b)=>{return a + (b.price*b.quantity)},0)
	}

	get totalQuantity(){
		return this.state.cart.length
	}

	addToCart(item){

		let newCart = this.state.cart
		let newitem = true;

		if(newCart.length == 0){
			item.quantity = 1;
			newCart.push(item)
			this.setState({cart:newCart})
		} else {
			newCart.forEach(function(currentItem,index){
				if(currentItem.product_name == item.product_name){
					currentItem.quantity++
					newitem = false	
				}
			})
			this.setState({cart:newCart});
			if(newitem){
				item.quantity = 1
				newCart.push(item);
				this.setState({cart:newCart})
			}
		}
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
        let currentProducts = this.state.products
        console.log("index is " , currentProducts.indexOf(newCart[0]))
        let alterIndex = new Promise((resolve, reject)=>{resolve(currentProducts.indexOf(newCart[0]))})
        alterIndex.then((index)=>{
        	let changeThisProduct = index
        	console.log(index, changeThisProduct)
	        let updatedProducts = update(currentProducts, {[changeThisProduct]: {quantity:{$apply:(num)=>{return num - 1 }}}})
       	    console.log(currentProducts, updatedProducts)
       	    this.setState({
       	    	products: updatedProducts
       	    })
        })


    }


  	render() {
	    return (
		    <Router>
    			<div>
	        		<Route exact path="/" render={()=><Home cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/checkout" component={Checkout}/>
        		</div>
    		</Router>
	    );
  }
}

export default App;
