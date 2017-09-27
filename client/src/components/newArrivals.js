import React from "react"
import API from "../utils/API.js"

export default class NewArrivals extends React.Component {
	constructor(props) {
		super(props);

	}


	renderNavigation = () =>{
		let newproducts = this.props.products.filter(item=>item.new)
		if (newproducts.length > 6){
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
			this.props.products.reduce((newItems, product)=>{
				if (product.new){
					newItems.push(<li key={product.product_ID}>
						{/*<!-- TOVAR -->*/}
						<div className="tovar_item_new">
							<div className="tovar_img">
								<img src={product.imgUrl} alt="" />
								<div className="open-project-link"><a className="open-project tovar_view" href="javascript:void(0);" data-url="!projects/women/1.html" >quick view</a></div>
							</div>
							<div className="tovar_description clearfix">
								<a className="tovar_title" href="product-page.html" >{product.product_name}</a>
								<span className="tovar_price">{"$" + product.price}</span>
							</div>
						</div>{/*<!-- //TOVAR -->*/}
					</li>)
				}
				
				return newItems
					
			}, [])
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
