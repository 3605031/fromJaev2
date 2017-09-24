import React from "react"
import API from "../utils/API.js"

export default class OnSale extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	displaySale = () =>{
		API.getSale()
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
	
}