import React from "react";
import { Redirect, Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      registerError: props.registerError
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.registerUser = props.registerUser.bind(this);
    this.displayRegisterError = this.displayRegisterError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        registerError: nextProps.registerError,
        isUserLoggedIn: nextProps.isUserLoggedIn
      });
    }
  }

  handleSubmit(event) {
    console.log("submitted");
    if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        registerError: 1
      });
    } else {
      this.registerUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
    }
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // 0 - No Error 1 - User already exists // 2 Passwords dont match
  displayRegisterError() {
    if (this.state.registerError === 1) {
      return <p className='text-danger mx-auto'>E-mail already registered</p>;
    } else if (this.state.registerError === 2) {
      return <p className='text-danger mx-auto'>Passwords do not match</p>;
    } else {
      return;
    }
  }

  render() {
    if (this.state.isUserLoggedIn) {
      return <Redirect to='/dashboard' />;
    } else {
      return (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body p-5 d-flex flex-column justify-content-center'>
                  <h2 className='text-center'>Welcome!</h2>
                  <form onSubmit={this.handleSubmit}>
                    <div className='form-group my-3'>
                      <input
                        className='form-control w-75 mx-auto'
                        type='name'
                        name='name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group my-3'>
                      <input
                        className='form-control w-75 mx-auto'
                        type='email'
                        name='email'
                        placeholder='E-mail'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className='form-group my-3'>
                      <input
                        className='form-control w-75 mx-auto'
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                    <div className='form-group my-3'>
                      <input
                        className='form-control w-75 mx-auto'
                        type='password'
                        name='confirmpassword'
                        placeholder='Confirm Password'
                        value={this.state.confirmpassword}
                        onChange={this.handleChange}
                        required
                      ></input>
                    </div>
                    <div className='my-2 d-flex'>
                      {this.displayRegisterError()}
                    </div>
                    <div className='my-3 d-flex'>
                      <button
                        className='btn btn-dark mx-auto px-3'
                        type='submit'
                        value='Submit'
                      >
                        Register
                      </button>
                    </div>
                  </form>
                  <p className='mx-auto'>
                    {"I want to "}
                    <Link to='/' className='text-dark'>
                      <b>sign in</b>.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Register;
