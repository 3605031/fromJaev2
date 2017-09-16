import React from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavButtonAddon extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<div className={this.props.totalType + "_total"}>
				<div className="clearfix"><span className= {this.props.totalType + "_subtotal"} >bag subtotal: <b>{this.props.total}</b></span></div>
				<a className="btn active" href="checkout.html">Checkout</a>
			</div>
			)
	}

}	