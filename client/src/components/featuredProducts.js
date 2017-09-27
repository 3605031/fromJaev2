import React from "react"
import Flexbox from "flexbox-react"
import Item from "./common/item.js"
import API from "../utils/API.js"

export default class FeaturedProducts extends React.Component {
	constructor(props) {
		super(props);
/*        this.props.handleAddToCart = this.handleAddToCart.bind(this)*/
        this.renderItems = this.renderItems.bind(this)
	}
    componentDidMount() {
        
    }

    // displayFeatured = () =>{
    //     API.getFeatured()
    //         .then(res=>{
    //             console.log(res)
    //             this.setState((prevState)=>{
    //                 console.log(prevState)
    //                 return {
    //                     products: res.data
    //                 }
    //             }, this.renderItems)
    //         })
    //         .then(()=>{
    //             console.log(this.state)
    //         })
    //         .catch(err=> console.log(err))
    // }


	renderItems(){

		let newproducts = this.props.products.filter((item)=>item.featured)
		//eventully, dummyobj will be replaced with an API call to retrieve the items from database 
		return newproducts.map((toBeReplaced, index)=>{

			return(	
                <Item key={toBeReplaced._id} product_ID={toBeReplaced.product_ID} imgUrl={toBeReplaced.imgUrl} handleAddToCart={this.props.handleAddToCart} product_name={toBeReplaced.product_name} price={toBeReplaced.price} quantity={toBeReplaced.quantity} featuredIndex={index}/>
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
