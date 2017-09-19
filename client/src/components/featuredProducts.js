import React from "react"
import Flexbox from "flexbox-react"
let dummyObj = [{
    "imgUrl" : "images/tovar/women/boo.png" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/slowpoke.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/weedMon.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/flowerbutt.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/crush.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/boo.png" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/slowpoke.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/weedMon.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/flowerbutt.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/crush.jpg" ,
    "product_ID":123,
    "product_name": "dummy",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
}]

export default class FeaturedProducts extends React.Component {
	constructor(props) {
		super(props);
	}

	renderItems = () =>{


		//eventully, dummyobj will be replaced with an API call to retrieve the items from database 
		return dummyObj.map(function(toBeReplaced){
			return(	
					<div className="padbot40" style={{paddingLeft: "15px", paddingRight: "15px"}}>
						<div className="tovar_item">
							<div className="tovar_img">
								<div className="tovar_img_wrapper feature_item0">
									<img className="img"   src={toBeReplaced.imgUrl} alt="" />
									<img className="img_h"  src={toBeReplaced.imgUrl} alt="" />
								</div>
								<div className="tovar_item_btns">
				
									<a className="add_bag" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i></a>
			
								</div>
							</div>
							<div className="tovar_description clearfix">
								<a className="tovar_title feature_item_title0" href="product-page.html" >{toBeReplaced.product_name}</a>
								<span className="tovar_price feature_item_price0">{toBeReplaced.price}</span>
								<span className="tovar_quantity feature_item_quantity0">Quantity: {toBeReplaced.quantity}</span>
							</div>
						</div>
					</div>
				)
		})
	}

	render(){
		return(
			// <!-- TOVAR SECTION -->
		<section className="tovar_section">
			
			{/*<!-- CONTAINER -->*/}
			<div className="container">
				<h2 id="feature_title">Featured products</h2>
				
				{/*<!-- ROW -->*/}
				<Flexbox>
					<Flexbox className="tovar_wrapper" data-appear-top-offset='-100' data-animated='fadeInUp' style={{flexWrap:"wrap"}}>
						{this.renderItems()}
					</Flexbox>
				</Flexbox>				
			</div>{/*<!-- CONTAINER -->*/}
		</section>

		)
	}
}
