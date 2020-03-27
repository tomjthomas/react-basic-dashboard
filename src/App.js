import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import Dashboard from "./Dashboard.js";
import data from "./data.json";

let users = data["users"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: false,
      loggedInUserID: null,
      loginError: 0, // 0 - No Error 1 - User doesnt exist // 2 - Password Incorrect
      registerError: 0 // 0 - No Error 1 - User already exists // 2 Passwords dont match
    };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  // Checks if user is logged in before displaying dashboard
  checkLoginState() {
    if (this.state.isUserLoggedIn) {
      const user = users[this.state.loggedInUserID];
      return <Dashboard user={user} logout={this.logout} />;
    } else {
      return <Redirect to='/' />;
    }
  }

  // checks if user exists in users array
  checkUser(email) {
    let flag = false;
    users.forEach(element => {
      if (element.email === email) flag = true;
    });
    return flag;
  }

  // checks if the login information is correct
  checkLogin(user) {
    if (!this.checkUser(user.email)) {
      this.setState({ loginError: 1 });
      return;
    } else {
      let flag = true;
      users.forEach((element, index) => {
        if (
          element.email === user.email &&
          element.password === user.password
        ) {
          flag = false;
          this.setState({
            isUserLoggedIn: true,
            loggedInUserID: index,
            loginError: 0
          });
        }
      });
      if (flag) {
        this.setState({
          loginError: 2
        });
      }
    }
  }

  // adds a user to users array
  registerUser(user) {
    const newUserId = users.length;
    if (this.checkUser(user.email)) {
      this.setState({ registerError: 1 });
      return;
    }
    users.push({
      id: newUserId,
      name: user.name,
      email: user.email,
      password: user.password
    });
    this.setState({
      isUserLoggedIn: true,
      loggedInUserID: newUserId,
      registerError: 0
    });
  }

  // sets logged out state
  logout() {
    this.setState({
      isUserLoggedIn: false
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <Login
                loginError={this.state.loginError}
                isUserLoggedIn={this.state.isUserLoggedIn}
                checkLogin={this.checkLogin}
              />
            </Route>
            <Route path='/register'>
              <Register
                registerError={this.state.registerError}
                isUserLoggedIn={this.state.isUserLoggedIn}
                registerUser={this.registerUser}
              />
            </Route>
            <Route path='/dashboard'>{this.checkLoginState}</Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
