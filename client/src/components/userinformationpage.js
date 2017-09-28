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
		  firstName: "",
		  lastName: "",
      address: "",
      isSubmitted: false,
      shippingCost: 0 
		};
		// Binding the event listeners which we will pass as props
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onToken = this.onToken.bind(this)
    this.successPayment = this.successPayment.bind(this)
    this.errorPayment = this.errorPayment.bind(this)
	}

  onToken = (amount, description) => token => {
    axios.post("/pay",
      {
        description,
        source: token.id,
        amount: 1,
        cart: this.props.cart
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
      let requestObj= this.state
      requestObj.cart = this.props.cart
      axios.post("/cart", requestObj).then(res=>{
          console.log(res)

      })

      this.setState({
          isSubmitted: !this.state.isSubmitted
      })

    }
    onSubmitTable = () =>{
      return(
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
                {this.props.totalPrice() * 0.08}
              </td>
              <td className="product-quantity">
                {this.state.shippingCost}
              </td>
            </tr>
          </tbody>
        </table>          
      )
    }
  

	handleInputChange(event) {
	  // Getting the value and name of the input which triggered the change
	  const value = event.target.value;
	  const name = event.target.name;
    console.log( value, name)
	  // Updating the input's state

    this.setState({ [event.target.name]: event.target.value })
	}
	handleFormSubmit(event) {
	  // Preventing the default behavior of the form submit (which is to refresh the page)
	  event.preventDefault();

	  // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
	  console.log(`Hello ${this.state.firstName} ${this.state.lastName}`);
	  this.setState({
	    firstName: "",
	    lastName: "",
      address: ""
	  });

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
      <Input type="email" name="email" />
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
  {this.state.isSubmitted && this.onSubmitTable()}
{/*<StripeCheckout
          name={this.state.firstName}
          description="test"
          amount={1}
          token={this.onToken(1, "test")}
          currency={"USD"}
          stripeKey={"pk_test_1BL0osBFkpOtUv2tExXFocfj"}
        />*/}
 


</div>
			)
	}
}
