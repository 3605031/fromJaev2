import React, { Component } from 'react';
import update from "immutability-helper"
import Navbar from "./components/navbar.js"
import Featured from "./components/featuredProducts.js"
import NewArrival from "./components/newArrivals.js"
import Stickers from "./components/stickers.js"
import Instagram from "./components/Instagram.js"
import Footer from "./components/Footer.js"
import API from "./utils/API.js"
import './App.css';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			cart: [], 			
			username: "",
			password: "",
			showSale: false,
			showStickers: false,
			showJewelery: false,
			showFigurines: false,
			showFeaturedAndNewArrivals: true
		}
		this.handleAddToCart = this.handleAddToCart.bind(this)
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
		let addItem = item
		let fullCart = this.state.cart
		let addPurchaseQuantity = {purchaseQuantity:0}
		let purchaseThis = Object.assign({}, addItem, addPurchaseQuantity)
		console.log("previous cart" + JSON.stringify(this.state.cart))
		fullCart.push(purchaseThis)
		console.log("full cart" + JSON.stringify(fullCart))
		let reducedCart = fullCart.reduce(function(acc, curr, currIndex){
			console.log(acc, curr)
			console.log(acc.indexOf(curr))
			if (acc[currIndex]=== curr){
				curr.purchaseQuantity ++
				return acc
			} else {
				let addPurchaseQuantity = {purchaseQuantity:0}
				let purchaseThis = Object.assign({}, curr, addPurchaseQuantity)
				acc.push(purchaseThis)
				return acc
			}
		},[])
		console.log("reduced cart" + JSON.stringify(reducedCart))

		this.setState((state)=> update(state, {cart:{$set:reducedCart}}))
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
		        
		        <Featured handleAddToCart={this.handleAddToCart}/>

		        <Stickers handleAddToCart={this.handleAddToCart}/>

		        <hr className="container"/>

		        <Instagram/>

		        <Footer/>
		    </div>  
	    );
  }
}

export default App;
