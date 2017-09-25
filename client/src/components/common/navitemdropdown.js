import React from "react"

export default class NavItemDropdown extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render(){
		return(
			<li className="clearfix" key={this.props.product_ID}>
				<img className="cart_item_product" src={this.props.imgUrl} alt="" />
				<a href="product-page.html" className="cart_item_title">{this.props.product_name}</a>
				<span className="cart_item_price">{this.props.quantity} x {this.props.price}</span>
			</li>
				
			)
	}
}