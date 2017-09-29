import React, { Component } from "react";
import NavButton from "./common/navbutton.js"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Toast} from "react-materialize"
import NavItemDropdown from "./common/navitemdropdown.js"
import axios from "axios"
import StripeCheckout from "react-stripe-checkout"

export default class UserForm  extends Component {
	constructor(props) {
		super(props);
		// Setting initial state to store the input values
		this.state = {
      form: {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
      }, 
      isSubmitted: false,
      shippingCost: 0,
      orderId: "",
      shippingMethods: [],
      selectedShippingMethod: {},
      tax: 0

		};
		// Binding the event listeners which we will pass as props
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onToken = this.onToken.bind(this)
    this.successPayment = this.successPayment.bind(this)
    this.errorPayment = this.errorPayment.bind(this)
	}

    onToken = () => token => {
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
      })


    }
    onSubmitTable = () =>{
      console.log("stripe checkout button", this.state.form.firstName)
      return(
        <div>
          <table className = "shop_table">
            <thead>
              <tr>
                <th className= "product-name">Total</th>
                <th className= "product-price">Tax</th>
                <th className= "product-quantity">Shipping</th>
              </tr>
            </thead>
            <tbody className = "checkout_body">
              <tr className = "cart_item">
                <td className="product-name">
                  {this.props.totalPrice()}
                </td>
                <td className="product-price">
                  {parseFloat((this.state.tax/100).toFixed(2))}
                </td>
                <td className="product-quantity">
                  {parseFloat(this.state.selectedShippingMethod.amount/100).toFixed(2)}
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
       </div>          
      )
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
	handleFormSubmit(event) {
	  // Preventing the default behavior of the form submit (which is to refresh the page)
	  event.preventDefault();

	  // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
	  console.log(`Hello ${this.state.form.firstName} ${this.state.form.lastName}`);

	}

	render(){
		return(
<div id="page">
  <Form>
    <FormGroup>
      <Label for="name">First Name</Label>
      <Input type="text" name="firstName" onChange={this.handleInputChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="name">Last Name</Label>
      <Input type="text" name="lastName" onChange={this.handleInputChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="name">Email</Label>
      <Input type="email" name="email" onChange={this.handleInputChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="name">Address</Label>
      <Input type="text" name="address" onChange={this.handleInputChange}/>
    </FormGroup>
    <FormGroup>
      <Label for="name">Zipcode</Label>
      <Input type="text" name="zipcode" />
    </FormGroup>
    <FormGroup>
      <Label for="name">State</Label>
      <Input type="text" name="state" />
    </FormGroup>
    <FormGroup>
      <Label for="name">Phone</Label>
      <Input type="text" name="Phone" />
    </FormGroup>
    <Button onClick = {(event)=>this.toggleSubmit(event)}>Submit</Button>
  </Form>
  {this.state.isSubmitted && this.onSubmitTable()
    }
 


</div>
			)
	}
}
