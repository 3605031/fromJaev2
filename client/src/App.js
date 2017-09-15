import React, { Component } from 'react';
import Navbar from "./components/navbar.js"
import Featured from "./components/featuredProducts.js"
import NewArrival from "./components/newArrivals.js"
import Instagram from "./components/Instagram.js"
import Footer from "./components/Footer.js"
import './App.css';
	
class App extends Component {
  render() {
    return (
    <div id="page">

        <header>
      		<Navbar/>
        </header>

		<section id="home" class="padbot0">		
			<div className="flexslider top_slider">
				<ul className="slides">
					<li className="slide1">	
					</li>
				</ul>
			</div>
		</section>
        
        <Featured/>

        <NewArrival/>

        <hr class="container"/>

        <Instagram/>

        <Footer/>
    </div>  
    );
  }
}

export default App;
