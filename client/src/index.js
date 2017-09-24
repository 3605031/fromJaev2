import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Signup from './components/Signup'
import Checkout from './components/Checkout'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';



ReactDOM.render(
    <Router>
    	<div>
        <Route exact path="/" component={App}/>
        <Route path="/signup" component={Signup}/>
        <Route exact path="/checkout" component={Checkout}/>
        </div>
    </Router>

, document.getElementById('root'));
registerServiceWorker();
