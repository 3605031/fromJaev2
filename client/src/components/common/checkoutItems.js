import React from "react"
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class checkoutItems extends React.Component {
	constructor(props) {
		super(props);
		
	}

	componentDidMount(){
		console.log("checkoutitems",this.props.item);
	}

	render(){
		return(

			<tr className="cart_item">
	            <td className="product-thumbnail"><a href="product-page.html" ><img src={this.props.item.imgUrl} width="100px" alt="" /></a></td>
	            <td className="product-name">
	                <a>{this.props.item.product_name}</a>
	                {/*<ul className="variation">
	                    <li className="variation-Color">Color: <span>Brown</span></li>
	                    <li className="variation-Size">Size: <span>XS</span></li>
	                </ul>*/}
	            </td>

	            <td className="product-price">${this.props.item.price}</td>

	            <td className="product-quantity">
	                <select className="basic">
	                    <option value="">1</option>
	                </select>
	            </td>
	            
	            <td className="product-subtotal">${this.props.item.price*this.props.item.quantity}</td>

	            <td className="product-remove"><a href="javascript:void(0);" ><span>Delete</span> <i>X</i></a></td>
	        </tr>
		)
	}

}	