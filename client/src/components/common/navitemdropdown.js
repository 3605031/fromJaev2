import React from "react"

export default class NavItemDropdown extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<li className="clearfix">
				<img className="cart_item_product" src={this.props.img_url} alt="" />
				<a href="product-page.html" className="cart_item_title">{this.props.item_name}</a>
				<span className="cart_item_price">{this.props.quantity} x {this.props.price}</span>
			</li>
				
			)
	}
}