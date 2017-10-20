import React from "react"

export default class Footer extends React.Component{
	render(){
		return(
		
		<footer>	
			{/*<!-- CONTAINER -->*/}
			<div className="container" data-animated='fadeInUp'>
				
				{/*<!-- ROW -->*/}
				<div className="row">
					
					<div className="col-lg-2 col-md-2 col-sm-3 col-xs-6 col-ss-12 padbot30">
						<h4>Contacts</h4>
						<div className="foot_address"><span>Glammy Shop</span>55 Ney York 6515, Grand Tower</div>
						<div className="foot_phone"><a href="tel:1 800 888 2828" >1 800 888 2828</a></div>
						<div className="foot_mail"><a href="mailto:info@glamyshop.com" >info@glamyshop.com</a></div>
						<div className="foot_live_chat"><a href="javascript:void(0);" ><i className="fa fa-comment-o"></i> Live chat</a></div>
					</div>
					
					<div className="col-lg-2 col-md-2 col-sm-3 col-xs-6 col-ss-12 padbot30">
						<h4>Information</h4>
						<ul className="foot_menu">
							<li><a href="about.html" >About Us</a></li>
										<li><a href="gallery.html" >Gallery<span>new</span></a></li>
							<li><a href="javascript:void(0);" >Delivery</a></li>
							<li><a href="javascript:void(0);" >Privacy police</a></li>
							<li><a href="blog.html" >Blog</a></li>
							<li><a href="faq.html" >Faqs</a></li>
							<li><a href="contacts.html" >countact us</a></li>
						</ul>
					</div>
					
					<div className="respond_clear_480"></div>
					
					<div className="col-lg-4 col-md-4 col-sm-6 padbot30">
						<h4>About shop</h4>
						<p>We ask for your name, telephone number, home address, email address and age for competitions, prize draws or newsletter sign ups. When a purchase is made on our site, in addition to the above, we also ask for delivery address, and payment method details.</p>
						<p>We may obtain information about your usage of our website to help us develop and improve it further through online surveys and other requests.</p>
					</div>
					
					<div className="respond_clear_768"></div>
					
					<div className="col-lg-4 col-md-4 padbot30">
						
						<h4>we are in social networks</h4>
						<div className="social">
							<a href="javascript:void(0);" ><i className="fa fa-twitter"></i></a>
							<a href="javascript:void(0);" ><i className="fa fa-facebook"></i></a>
							<a href="javascript:void(0);" ><i className="fa fa-google-plus"></i></a>
							<a href="javascript:void(0);" ><i className="fa fa-pinterest-square"></i></a>
							<a href="javascript:void(0);" ><i className="fa fa-tumblr"></i></a>
							<a href="javascript:void(0);" ><i className="fa fa-instagram"></i></a>
						</div>
					</div>
				</div>{/*<!-- //ROW -->*/}
			</div>{/*<!-- //CONTAINER -->*/}
			
			{/*<!-- COPYRIGHT -->*/}
			<div className="copyright">
				
				{/*<!-- CONTAINER -->*/}
				<div className="container clearfix">
					<div className="foot_logo"><a href="index.html" ><img src="images/foot_logo.png" alt=""/></a></div>
					
					<div className="copyright_inf">
						<span>FromJae Shop© 2017</span> |
						<span>Website by Blake Huynh</span> |
						<a className="back_top" href="javascript:void(0);" >Back to Top <i className="fa fa-angle-up"></i></a>
					</div>
				</div>{/*<!-- //CONTAINER -->*/}
			</div>{/*<!-- //COPYRIGHT -->*/}
		</footer>
		)
	}
}