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
      address: ""
		};
		// Binding the event listeners which we will pass as props
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onToken = this.onToken.bind(this)
	}

  onToken = (amount, description) => token => {
    axios.post("/pay",
      {
        description,
        source: token.id,
        amount: 1
      })
      .then(successPayment)
      .catch(errorPayment);    
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
    <Button >Submit</Button>
  </Form>
<StripeCheckout
          name={this.state.firstName}
          description="test"
          amount={1}
          token={this.onToken(1, "test")}
          currency={"USD"}
          stripeKey={"pk_test_1BL0osBFkpOtUv2tExXFocfj"}
        />
 
</div>
			)
	}
}
