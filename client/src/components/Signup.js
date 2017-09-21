import React, { Component } from 'react';
import axios from "axios";


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
            axios.post("/signup",this.state);
        }
    }
  }

  render() {
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