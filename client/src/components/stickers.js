import React from "react"
import API from "../utils/API.js"
import Flexbox from "flexbox-react"
import Item from "./common/item.js"

export default class Stickers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
		
	}

	displayPins = () =>{
		API.getPins()
			.then(res=>{
				console.log(res)
				this.setState((prevState)=>{
					console.log(prevState)
					return {
						products: res.data
					}
				})
			})
			.then(()=>{
				console.log(this.state)
			})
			.catch(err=> console.log(err))
	}

	componentDidMount() {
		this.displayPins()
	}

	renderItems(){
		return this.state.products.map((toBeReplaced, index)=>{
			return(	
                <Item product_ID={toBeReplaced.product_ID} imgUrl={toBeReplaced.imgUrl} handleAddToCart={this.props.handleAddToCart} product_name={toBeReplaced.product_name} price={toBeReplaced.price} quantity={toBeReplaced.quantity} featuredIndex={index}/>
				)
		})
	}

	render(){
		return(
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