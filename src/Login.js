import React from "react";
import { Link, Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: props.loginError,
      isUserLoggedIn: props.isUserLoggedIn
    };
    this.checkLogin = props.checkLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.displayLoginError = this.displayLoginError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        loginError: nextProps.loginError,
        isUserLoggedIn: nextProps.isUserLoggedIn
      });
    }
  }

  handleSubmit(event) {
    this.checkLogin(this.state);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // 0 - No Error 1 - User doesnt exist // 2 - Password Incorrect
  displayLoginError() {
    if (this.state.loginError === 1) {
      return <p className='text-danger mx-auto'>User does not exist</p>;
    } else if (this.state.loginError === 2) {
      return (
        <p className='text-danger mx-auto'>E-mal and password does not match</p>
      );
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
                <div className='card-body p-5  d-flex flex-column justify-content-center'>
                  <h2 className='text-center'>Welcome!</h2>
                  <form onSubmit={this.handleSubmit}>
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
                    <div className='my-2 d-flex'>
                      {this.displayLoginError()}
                    </div>
                    <div className='my-3 d-flex'>
                      <button
                        className='btn btn-dark mx-auto px-3'
                        type='submit'
                      >
                        Login
                      </button>
                    </div>
                  </form>
                  <p className='mx-auto'>
                    {"I "}
                    <Link to='/register' className='text-dark'>
                      <b>dont have an account</b>
                    </Link>
                    {" yet."}
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

export default Login;
