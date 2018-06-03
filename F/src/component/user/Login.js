import React, { Component } from 'react';

import { LoginUser } from './ActionUser';

import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Estado handleSubmit",this.state);
    LoginUser(this.state);
  }

  render() {
    return (
      <div className="login">
        <h1>Please Login</h1>
        <div className="thumbnail">
          <img alt="description of bombillo" src=".././bombillo.png" ></img>
        </div>
        <form onSubmit={this.handleSubmit} className="login-login" autocomplete="off">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.handleChange(e)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
           />
          <button
            disabled={!this.validateForm()}>Login
          </button>
          <p className="message">Not registered? <a href="#Create">Create an account</a></p>
        </form>
      </div>
    );
  }
}

export default Login;
