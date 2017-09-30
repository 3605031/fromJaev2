import React from "react"

export default class Item extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			imgCss:{
				outline: "0",
				verticalAlign: "top",
			    border: "0",
			    maxWidth: "100.1%",
			    height: "auto"
			},
			imghCss:{
				opacity: "0.25",
				outline: "0",
				verticalAlign: "top",
			    border: "0",
			    maxWidth: "100.1%",
			    height: "auto"
			}
		}
		
	}

	render(){
		return(
			<div className="padbot40 col-lg-3 col-md-3 col-sm-4 col-xs-6 col-ss-12" style={{paddingLeft: "15px", paddingRight: "15px"}} key={this.props.product_ID}>
				<div className="tovar_item">
					<div className="tovar_img">
						<div className={`tovar_img_wrapper feature_item${this.props.featuredIndex}`}>
							<img className="img"   src={this.props.imgUrl} alt="" />
							<img className="img_h"  src={this.props.imgUrl} alt="" />
						</div>
						<div className="tovar_item_btns">
		
							<a className="add_bag" onClick={(event)=>this.props.handleAddToCart(event, this.props.product_ID)}><i className="fa fa-shopping-cart"></i></a>
	
						</div>
					</div>
					<div className="tovar_description clearfix">
						<a className="tovar_title feature_item_title0" href="product-page.html" >{this.props.product_name}</a>
						<span className="tovar_price feature_item_price0">${this.props.price.toFixed(2)}</span>
						<span className="tovar_quantity feature_item_quantity0">Quantity: {this.props.quantity}</span>
					</div>
				</div>
			</div>
		)
	}
}