import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, browserHistory, Redirect } from 'react-router-dom';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      redirect:false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    if(this.state.username==''||this.state.password==''){
        alert("Fill out username and PW")
    } else {
        if(this.state.password != this.state.passwordConfirmation){
            alert("PW must match")
        } else {
            axios.post("/auth/signup",this.state)
                .then(  (response) => {
                    console.log(response.data.success == true);
                    if(response.data.success == true){
                        this.setState({redirect:true})
                    }
                })
                    .catch(function (error) {console.log(error)})
        }
    }
  }

  render() {

    const redirect = this.state.redirect;

    if(redirect){
        return <Redirect to = "./"/>;
    }

    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
            <form onSubmit={this.onSubmit} className="signup-form">
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>   

                <div className="form-group">
                    <label className="control-label">PW</label>
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Retype PW</label>
                    <input
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirmation"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div> 
                <button className="btn btn-primary btn-lg">Signup</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Signup;