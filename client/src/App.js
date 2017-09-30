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
import axios from "axios";
	
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			cart: [], //price, quantity, imgUrl, product_name
      		firstName: "",
      		lastName:"",
      		address: "",
      		zipCode:"",
      		city: "",
      		state:"",
      		phoneNumber:"",
			username: '',
      		email: '',
      		password: '',
      		passwordConfirmation: '',
      		loginusername: '',
      		loginpassword: '',
      		isAuthenticated: false,
      		token: '',
			showSignUpModal: false,
			showLogInModal : false,

		}
		this.handleAddToCart = this.handleAddToCart.bind(this)
		this.addToCart       = this.addToCart.bind(this)
    	this.cartItems = this.cartItems.bind(this)
    	this.totalPrice = this.totalPrice.bind(this)
    	this.removeFromCart = this.removeFromCart.bind(this)
    	this.onSubmit    = this.onSubmit.bind(this);
    	this.loginSubmit = this.loginSubmit.bind(this);
		this.onChange    = this.onChange.bind(this);
		this.closeSignUp = this.closeSignUp.bind(this);
		this.closeLogIn  = this.closeLogIn.bind(this);
		this.openLogIn   = this.openLogIn.bind(this);
		this.openSignUp  = this.openSignUp.bind(this);
	}


	closeSignUp() {
    	this.setState({ showSignUpModal: false });
  	}

  	closeLogIn(){
  		this.setState({ showLogInModal:false})
  	}

  	openSignUp() {
    	this.setState({ showSignUpModal: true });
  	}

  	openLogIn(){
  		console.log("show log in modal")
  		this.setState({ showLogInModal: true})
  	}

  	onChange(e) {
    	this.setState({ [e.target.name]: e.target.value });
  	}

  	onSubmit(e) {
    	e.preventDefault();
    	if(this.state.username==''||this.state.password==''){
        	alert("Fill out username and PW")
    	} else {
        	if(this.state.password != this.state.passwordConfirmation){
            	alert("PW must match")
        	} else {
        		console.log("app state is" , this.state);
            axios.post("/auth/signup",this.state)
                .then(  (response) => {
                    console.log(response.data.success == true);
                    if(response.data.success == true){
                        alert("You signed up successfully!");
                        this.closeSignUp()
                    }
                })
                    .catch(function (error) {console.log(error)})
        	}
    	}
    }

    loginSubmit(e){
    	e.preventDefault();
    	if(this.state.loginusername==''||this.state.loginpassword==''){
    		alert("Fill out username and PW")
    	} else {
    		console.log("You're logging in")
    		var info = {
    			username : this.state.loginusername,
    			password : this.state.loginpassword
    		}
    		axios.post("/auth/login",info)
    				.then((response) => {
    					if(response.data.success==true){
    						console.log("previous state before update is ", this.state)
    						console.log("response.data is " , response.data)
    						this.setState({
								isAuthenticated:true,
								token:response.data.user.token,
								firstName: response.data.user.firstName,
					      		lastName:response.data.user.lastName,
					      		address: response.data.user.address,
					      		zipCode:response.data.user.zipCode,
					      		state:response.data.user.state,
					      		phoneNumber:response.data.user.phoneNumber,
					      		email: response.data.user.email
							});
                        	this.closeLogIn()
    					} else {
    						alert("Your credentials are wrong");
    					}
    				}).then(()=>{
    					console.log("state after this.setstate is ", this.state)
    				})
    					.catch((err)=>console.log(err));
    	}

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
	        		<Route exact path="/" render={()=><Home showSignUpModal = {this.state.showSignUpModal} showLogInModal = {this.state.showLogInModal} closeSignUp = {this.closeSignUp} closeLogIn = {this.closeLogIn} openSignUp = {this.openSignUp} openLogIn = {this.openLogIn} firstName = {this.state.firstName} isAuthenticated = {this.state.isAuthenticated} onSubmit = {this.onSubmit} loginSubmit = {this.loginSubmit} onChange = {this.onChange}  cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/checkout" render={()=><Checkout firstName = {this.state.firstName} lastName = {this.state.lastName} address = {this.state.address} zipCode = {this.state.zipCode} USstate= {this.state.state} phoneNumber = {this.state.phoneNumber} email = {this.state.email} city={this.state.city} isAuthenticated = {this.state.isAuthenticated} removeFromCart={this.removeFromCart} cart={this.state.cart} totalPrice={this.totalPrice}/>}/>
	        		<Route exact path ="/userinfo" render={()=><UserForm firstName = {this.state.firstName} totalPrice = {this.totalPrice} cart={this.state.cart}/>}/>
	        		<Route exact path="/figurine" render={()=><Figurine showSignUpModal = {this.state.showSignUpModal} showLogInModal = {this.state.showLogInModal} closeSignUp = {this.closeSignUp} closeLogIn = {this.closeLogIn} openSignUp = {this.openSignUp} openLogIn = {this.openLogIn} firstName = {this.state.firstName} isAuthenticated = {this.state.isAuthenticated} onSubmit = {this.onSubmit} loginSubmit = {this.loginSubmit} onChange = {this.onChange}  cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/jewelry" render={()=><Jewelry showSignUpModal = {this.state.showSignUpModal} showLogInModal = {this.state.showLogInModal} closeSignUp = {this.closeSignUp} closeLogIn = {this.closeLogIn} openSignUp = {this.openSignUp} openLogIn = {this.openLogIn} firstName = {this.state.firstName} isAuthenticated = {this.state.isAuthenticated} onSubmit = {this.onSubmit} loginSubmit = {this.loginSubmit} onChange = {this.onChange}  cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/stickers" render={()=><Stickers showSignUpModal = {this.state.showSignUpModal} showLogInModal = {this.state.showLogInModal} closeSignUp = {this.closeSignUp} closeLogIn = {this.closeLogIn} openSignUp = {this.openSignUp} openLogIn = {this.openLogIn} firstName = {this.state.firstName} isAuthenticated = {this.state.isAuthenticated} onSubmit = {this.onSubmit} loginSubmit = {this.loginSubmit} onChange = {this.onChange}  cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
	        		<Route exact path="/sale" render={()=><Sale showSignUpModal = {this.state.showSignUpModal} showLogInModal = {this.state.showLogInModal} closeSignUp = {this.closeSignUp} closeLogIn = {this.closeLogIn} openSignUp = {this.openSignUp} openLogIn = {this.openLogIn} firstName = {this.state.firstName} isAuthenticated = {this.state.isAuthenticated} onSubmit = {this.onSubmit} loginSubmit = {this.loginSubmit} onChange = {this.onChange}  cart={this.state.cart} cartItems={this.cartItems} products={this.state.products} handleAddToCart={this.handleAddToCart} totalPrice={this.totalPrice} totalQuantity={this.totalQuantity} getAll={this.getAll} />}/>
        		</div>
    		</Router>
	    );
  }
}

export default App;

