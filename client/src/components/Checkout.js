import React, { Component } from 'react';
import axios from "axios";
import Navbar from "./navbar.js"
import { BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom';
import {Link} from "react-router-dom"

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      redirect:false,
      products: [],
      cart: [] //price, quantity, imgUrl, product_name    
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
            axios.post("/auth/signup",this.state)
                .then(  (response) => {
                    console.log(response.data.success == true);
                    if(response.data.success == true){
                        this.setState({redirect:true})
                    }
                })
                    .catch(function (error) {console.log(error)})
        }
    }
  }

  renderCartItems = ()=> {
    return this.props.cart.map(item=>{
        return (
             <tr className="cart_item">
                <td className="product-thumbnail"><a href="product-page.html" ><img src={item.imgUrl} width="100px" alt="" /></a></td>
                <td className="product-name">
                    <a href="product-page.html">{item.product_name}}</a>
                    {/*<ul className="variation">
                        <li className="variation-Color">Color: <span>Brown</span></li>
                        <li className="variation-Size">Size: <span>XS</span></li>
                    </ul>*/}
                </td>

                <td className="product-price">{item.price}</td>

                <td className="product-quantity">
                    <select className="basic">
                        <option value="">$ {item.purchaseQuantity}</option>
                    </select>
                </td>
                
                <td className="product-subtotal">$ {item.purchaseQuantity * item.price}</td>

                <td className="product-remove"><a href="javascript:void(0);" ><span>Delete</span> <i>X</i></a></td>
            </tr>                          
            )
    })
  }

  render() {

    const redirect = this.state.redirect;

    if(redirect){
        return <Redirect to = "./"/>;
    }

    return (
            <div id="page">
                
                <section className="page_header checkoutheader">
                    
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
                                        <td className="checkout_subtotal">{this.props.totalPrice()}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <form className="coupon_form" action="javascript:void(0);" method="get">
                                <input type="text" name="coupon"/>
                                <input type="submit" value="Apply"/>
                            </form>
                            <Link className="btn active" to="/userinfo" >Check out</Link>
                            <a className="btn inactive" href="/" >Continue shopping</a>
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