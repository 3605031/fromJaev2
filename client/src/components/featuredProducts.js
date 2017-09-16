import React from "react"
import dummyObj from "./common/dummy.json"
import Flexbox from "flexbox-react"

export default class FeaturedProducts extends React.Component {
	constructor(props) {
		super(props);
	}

	renderItems = () =>{
		//eventully, dummyobj will be replaced with an API call to retrieve the items from database 
		return dummyObj.map(function(toBeReplaced){
			return(	
					<Flexbox className="padbot40" style={{paddingLeft: "15px", paddingRight: "15px"}}>
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
					</Flexbox>
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
					<Flexbox className="tovar_wrapper" data-appear-top-offset='-100' data-animated='fadeInUp' >
						{this.renderItems()}
					</Flexbox>
				</Flexbox>
				
				
				{/*<!-- ROW -->*/}
				<Flexbox>
					
					{/*<!-- TOVAR WRAPPER -->*/}
					<div className="tovar_wrapper" data-appear-top-offset='-100' data-animated='fadeInUp'>
						
						{/*<!-- TOVAR5 -->*/}
						<div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 col-ss-12 padbot40">
							<div className="tovar_item feature_item4">
								<div className="tovar_img">
									<div className="tovar_img_wrapper">
										<img className="img" src="images/tovar/women/weedMon.jpg" alt="" />
										<img className="img_h" src="images/tovar/women/weedMon.jpg" alt="" />
									</div>
									<div className="tovar_item_btns">
										
										<a className="add_bag" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i></a>
		
									</div>
								</div>
								<div className="tovar_description clearfix">
									<a className="tovar_title feature_item_title4" href="product-page.html" >RainbowPOO</a>
									<span className="tovar_price feature_item_price4">$118.00</span>
									<span className="tovar_quantity feature_item_quantity4">Quantity: 10</span>
								</div>
							</div>
						</div>{/*<!--TOVAR5 -->*/}
						
						<div className="respond_clear_768"></div>
						
						{/*<!-- TOVAR6 -->*/}
						<div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 col-ss-12 padbot40">
							<div className="tovar_item feature_item5">
								<div className="tovar_img">
									<div className="tovar_img_wrapper">
										<img className="img" src="images/tovar/women/flowerbutt.jpg" alt="" />
										<img className="img_h" src="images/tovar/women/flowerbutt.jpg" alt="" />
									</div>
									<div className="tovar_item_btns">
										
										<a className="add_bag" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i></a>
										
									</div>
								</div>
								<div className="tovar_description clearfix">
									<a className="tovar_title feature_item_title5" href="product-page.html" >RainbowPOO</a>
									<span className="tovar_price feature_item_price5">$118.00</span>
									<span className="tovar_quantity feature_item_quantity5">Quantity: 10</span>
								</div>
							</div>
						</div>{/*<!-- TOVAR6 -->*/}
						
						{/*<!-- TOVAR7 -->*/}
						<div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 col-ss-12 padbot40">
							<div className="tovar_item tovar_sale feature_item6">
								<div className="tovar_img">
									<div className="tovar_img_wrapper">
										<img className="img" src="images/tovar/women/crush.jpg" alt="" />
										<img className="img_h" src="images/tovar/women/crush.jpg" alt="" />
									</div>
									<div className="tovar_item_btns">
										
										<a className="add_bag" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i></a>
										
									</div>
								</div>
								<div className="tovar_description clearfix">
									<a className="tovar_title feature_item_title6" href="product-page.html" >RainbowPOO</a>
									<span className="tovar_price feature_item_price6">$118.00</span>
									<span className="tovar_quantity feature_item_quantity6">Quantity: 10</span>
								</div>
							</div>
						</div>{/*<!-- TOVAR7 -->*/}
						
						{/*<!-- TOVAR8 -->*/}
						<div className="col-lg-3 col-md-3 col-sm-4 col-xs-6 col-ss-12 padbot40">
							<div className="tovar_item">
								<div className="tovar_img">
									<div className="tovar_img_wrapper feature_item7">
										<img className="img" src="" alt="" />
										<img className="img_h" src="" alt="" />
									</div>
									<div className="tovar_item_btns">
										
										<a className="add_bag" href="javascript:void(0);" ><i className="fa fa-shopping-cart"></i></a>
										
									</div>
								</div>
								<div className="tovar_description clearfix">
									<a className="tovar_title feature_item_title7" href="product-page.html" >RainbowPOO</a>
									<span className="tovar_price feature_item_price7">$118.00</span>
									<span className="tovar_quantity feature_item_quantity7">Quantity: 10</span>
								</div>
							</div>
						</div>{/*<!-- TOVAR8 -->*/}
					</div>{/*<!-- TOVAR WRAPPER -->*/}
				</Flexbox>{/*<!-- ROW -->*/}						
			</div>{/*<!-- CONTAINER -->*/}
		</section>

		)
	}
}
