import React, { Component } from 'react';
import axios from "axios";
import Navbar from "./navbar.js";
import { BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom';
import {Link} from "react-router-dom";
import {Modal,OverlayTrigger,Button} from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout"

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showCheckOutModal : false,
        showPaymentModal : false,
        form: {
                firstName: "test",
                lastName: "",
                address: "",
                email: "",
                phoneNumber: "",
                zipCode: "",
                state: "",
                city:""
        }, 
        isSubmitted: false,
        shippingCost: 0,
        orderId: "",
        shippingMethods: [],
        selectedShippingMethod: {},
        tax: 0,
        test: "test"
    }

    this.openCheckOutModal  = this.openCheckOutModal.bind(this);
    this.closeCheckOutModal = this.closeCheckOutModal.bind(this);
    this.openPaymentModal   = this.openPaymentModal.bind(this);
    this.closePaymentModal  = this.closePaymentModal.bind(this);
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.onToken            = this.onToken.bind(this);
    this.successPayment     = this.successPayment.bind(this);
    this.errorPayment       = this.errorPayment.bind(this);
  }

    closeCheckOutModal(){
  		this.setState({ showCheckOutModal:false})
  	}

  	openCheckOutModal() {
    	this.setState({ showCheckOutModal: true });
    }
    
    closePaymentModal(){
  		this.setState({ showPaymentModal:false})
  	}

  	openPaymentModal() {
    	this.setState({ showPaymentModal: true });
  	}

    componentDidMount() {
        console.log("props from app.js are", this.props)
        this.setState({
            form: {                 
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                address: this.props.address,
                email: this.props.email,
                phoneNumber: this.props.phoneNumber,
                zipCode: this.props.zipCode,
                state: this.props.USstate,
                city: this.props.city
            }
        })
    }
      
    handleInputChange(event) {
	  // Getting the value and name of the input which triggered the change
        const value = event.target.value;
        const name = event.target.name;
        console.log( value, name)
        // Updating the input's state
        let updatedState = Object.assign({}, this.state.form)
        updatedState[event.target.name] = event.target.value
        this.setState({form:updatedState})
    }
    
    toggleSubmit = (event) =>{
      event.preventDefault()
      let requestObj= this.state.form

      for (let prop in requestObj){
        if (requestObj[prop] === ""){
          alert(`Please enter your ${JSON.stringify(prop)}`)
          return
        }
      }

      requestObj.cart = this.props.cart


      console.log("form sending to server",this.state.form)
      axios.post("/cart", requestObj)
      .then(res=>{
          let tax = res.data.items.find(taxObj=> taxObj.type === "tax")
          console.log("res from server side is ", res)
          this.setState({
            isSubmitted: !this.state.isSubmitted,
            shippingMethods:res.data.shipping_methods,
            selectedShippingMethod:res.data.shipping_methods[1],
            tax:tax.amount,
            orderId:res.data.id
          })
          this.closeCheckOutModal();
          this.openPaymentModal();
      })


    }

    onToken = () => token => {
      this.closePaymentModal();  
      axios.post("/pay",
        {
          source: token.id,
          cart: this.props.cart,
          orderId : this.state.orderId,
          selectedShippingMethod: this.state.selectedShippingMethod
        })
        .then(this.successPayment)
        .catch(this.errorPayment);    
    }

    successPayment = response => {
      console.log("response", response.body)

      
    }

    errorPayment = data => {
      console.log("err", data)
    }

    renderCartItems = ()=> {
      return this.props.cart.map(item=>{
        return (
             <tr className="cart_item">
                <td className="product-thumbnail"><a href="product-page.html" ><img src={item.imgUrl} width="100px" alt="" /></a></td>
                <td className="product-name">
                    <a href="product-page.html">{item.product_name}</a>
                    {/*<ul className="variation">
                        <li className="variation-Color">Color: <span>Brown</span></li>
                        <li className="variation-Size">Size: <span>XS</span></li>
                    </ul>*/}
                </td>

                <td className="product-price">${item.price.toFixed(2)}</td>

                <td className="product-price">
                {item.purchaseQuantity}
                </td>
                
                <td className="product-subtotal">${(item.purchaseQuantity * item.price).toFixed(2)}</td>

                <td className="product-remove"><a onClick={() => this.props.removeFromCart(item._id)} ><span>Delete</span> <i>X</i></a></td>
            </tr>                          
            )
    })
  }

  render() {

    const redirect = this.state.redirect;

    if(redirect){
        return <Redirect to = "./"/>;
    }
    console.log("checkout state is ", this.state)
    return (
            <div id="page">

            
                
                <section className="page_header checkoutheader">

                    <Modal show={this.state.showPaymentModal} onHide={this.closePaymentModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Payment Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <table className = "shop_table">
                                <thead>
                                <tr>
                                    <th className= "product-name">Subtotal</th>
                                    <th className= "product-price">Tax</th>
                                    <th className= "product-quantity">Shipping</th>
                                </tr>
                                </thead>
                                <tbody className = "checkout_body">
                                <tr className = "cart_item">
                                    <td className="product-price">
                                    ${this.props.totalPrice()}
                                    </td>
                                    <td className="product-price">
                                    ${parseFloat((this.state.tax/100).toFixed(2))}
                                    </td>
                                    <td className="product-price">
                                    ${parseFloat(this.state.selectedShippingMethod.amount/100).toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <StripeCheckout
                                name={this.state.form.firstName}
                                amount={this.props.totalPrice()*100+this.state.tax+this.state.selectedShippingMethod.amount}
                                token={this.onToken()}
                                currency={"USD"}
                                stripeKey={"pk_test_1BL0osBFkpOtUv2tExXFocfj"}
                            />                       
                        </Modal.Body>
        		    </Modal>

                    <Modal show={this.state.showCheckOutModal} onHide={this.closeCheckOutModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Check out Form</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={this.toggleSubmit} className="signup-form">
                                <div className="form-group">
                                    <label className="control-label">First Name</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.form.firstName}
                                    />
                                </div>   

                                <div className="form-group">
                                    <label className="control-label">Last Name</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.form.lastName}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Email</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={this.state.form.email}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Address</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        value={this.state.form.address}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">City</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={this.state.form.city}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">ZipCode</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="zipCode"
                                        className="form-control"
                                        value={this.state.form.zipCode}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">State</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="state"
                                        className="form-control"
                                        value={this.state.form.state}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Phone</label>
                                    <input
                                        onChange={this.handleInputChange}
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        value = {this.state.form.phoneNumber}
                                    />
                                </div>
			                    <button className="btn btn-primary btn-lg" onClick={this.toggleSubmit}>Pay</button>
            			    </form>
          			    </Modal.Body>
        		    </Modal>
                    
                    <div className="container">
                        <h3 className="pull-left"><b>Shopping bag</b> (Note: due to limited stock, we have disabled ability to adjust quantity inside shopping bag)</h3>
                        
                        <div className="pull-right">
                            <a href="/" >Back to shop<i className="fa fa-angle-right"></i></a>
                        </div>
                    </div>
                </section>
        
                <section className="shopping_bag_block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 padbot40">
                        
                        <table className="shop_table">
                            <thead>
                                <tr>
                                    <th className="product-thumbnail"></th>
                                    <th className="product-name">Item</th>
                                    <th className="product-price">Price</th>
                                    <th className="product-quantity">Quantity</th>
                                    <th className="product-subtotal">Total</th>
                                    <th className="product-remove"></th>
                                </tr>
                            </thead>
                            <tbody className="checkout_body">                               
                               {this.renderCartItems()}
                            </tbody>
                        </table>
                    </div>
                    
                    
                    <div id="sidebar" className="col-lg-3 col-md-3 padbot50">
                        
                        <div className="sidepanel widget_bag_totals">
                            <h3>BAG TOTALS</h3>
                            <table className="bag_total">
                                <tbody>
                                    <tr className="cart-subtotal clearfix">
                                        <th>Estimated Sub total</th>
                                        <td className="checkout_subtotal">${this.props.totalPrice().toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <form className="coupon_form" action="javascript:void(0);" method="get">
                                <input type="text" name="coupon"/>
                                <input type="submit" value="Apply"/>
                            </form>
                            <button className="btn active" onClick={this.openCheckOutModal}>Check out</button>
                            <Link className="btn inactive" to="/" >Continue shopping</Link>
                        </div>
                    </div>{/*Sidebar*/}
                </div>
            </div>
        </section>
    </div>  
    );
  }
}

export default Checkout;