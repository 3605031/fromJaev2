import React from "react"

let dummyObj = [{
    "imgUrl" : "images/tovar/women/new/chubbycat.jpg" ,
    "product_ID":11,
    "product_name": "chubbyCat",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/new/seastuff.png" ,
    "product_ID":12,
    "product_name": "seaStuff",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/new/crush.jpg" ,
    "product_ID":13,
    "product_name": "Crushthing",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/new/poodle.jpg" ,
    "product_ID":14,
    "product_name": "Poodles",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/new/flowerbutt.jpg" ,
    "product_ID":15,
    "product_name": "Poodles",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
},{
    "imgUrl" : "images/tovar/women/new/bubblehead.png" ,
    "product_ID":16,
    "product_name": "Poodles",
   " product_category": "featured",
    "description": "dummy",
    "price": 111,
    "quantity": 4,
    "sku": "oaiwejf8123"
}]




export default class NewArrivals extends React.Component {
	constructor(props) {
		super(props);
		
	}

	renderNavigation = () =>{
		if (dummyObj.length > 6){
			return(
				<div className="jCarousel_pagination">
					<a href="javascript:void(0);" className="jcarousel-control-prev" ><i className="fa fa-angle-left"></i></a>
					<a href="javascript:void(0);" className="jcarousel-control-next" ><i className="fa fa-angle-right"></i></a>
				</div>
				)
		} else{
			return
		}
	}

	renderItems = () => {
		return(
			//eventually, dummyobj will be replaced with an API call to retrieve the items from database (items to be presorted server side)
			dummyObj.map(function(toBeReplaced){
				return(
					<li>
						{/*<!-- TOVAR -->*/}
						<div className="tovar_item_new">
							<div className="tovar_img">
								<img src={toBeReplaced.imgUrl} alt="" />
								<div className="open-project-link"><a className="open-project tovar_view" href="javascript:void(0);" data-url="!projects/women/1.html" >quick view</a></div>
							</div>
							<div className="tovar_description clearfix">
								<a className="tovar_title" href="product-page.html" >{toBeReplaced.product_name}</a>
								<span className="tovar_price">{"$" + toBeReplaced.price}</span>
							</div>
						</div>{/*<!-- //TOVAR -->*/}
					</li>
				)
			})
		)
	}



	render(){
		return(
		// <!-- NEW ARRIVALS -->
		<section className="new_arrivals padbot50">
			
			{/*<!-- CONTAINER -->*/}
			<div className="container">
				<h2>new arrivals</h2>
				{this.renderNavigation()}
				{/*<!-- JCAROUSEL -->*/}
				<div className="jcarousel-wrapper">
					<div className="jcarousel" data-appear-top-offset='-100' data-animated='fadeInUp'>
						<ul>
							{this.renderItems()}
						</ul>
					</div>
				</div>{/*<!-- //JCAROUSEL -->*/}
			</div>{/*<!-- //CONTAINER -->*/}
	{/*<!-- //NEW ARRIVALS -->*/}</section>
		)
	}
}
