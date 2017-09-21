import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Signup from './components/Signup'
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/signup" component={Signup}/>
    </Router>

, document.getElementById('root'));
registerServiceWorker();
