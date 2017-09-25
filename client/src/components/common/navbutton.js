import React from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import NavButtonAddon from "./navbuttonaddon.js"

export default class NavButton extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<NavItem className = {this.props.propClass}>
				<NavLink href ="#" onClick = {this.props.url}>{this.props.name}</NavLink>
			</NavItem>
			)
	}

}