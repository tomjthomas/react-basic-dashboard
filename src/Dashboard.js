import React from "react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      password: props.user.password
    };
    this.logout = props.logout.bind(this);
  }
  render() {
    return (
      <div className='container h-100'>
        <div className='card h-100'>
          <div className='card-body p-4 d-flex flex-column'>
            <div className='row mb-3'>
              <div className='col d-flex'>
                <button className='btn btn-dark ml-auto' onClick={this.logout}>
                  Logout
                </button>
              </div>
            </div>
            <div className='row align-items-center mb-md-5'>
              <div className='col-md-4 d-flex justify-content-center'>
                <img
                  src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F7%2F7e%2FCircle-icons-profile.svg%2F768px-Circle-icons-profile.svg.png&f=1&nofb=1'
                  height='200px'
                  width='200px'
                  alt=''
                />
              </div>
              <div className='col-md-8'>
                <div className='row my-3 mx-md-3'>
                  <div className='col'>
                    <h5>Name</h5>
                    <p>{this.state.name}</p>
                  </div>
                </div>
                <div className='row my-3 mx-md-3'>
                  <div className='col'>
                    <h5>Email</h5>
                    <p>{this.state.email}</p>
                  </div>
                  <div className='col'>
                    <h5>Password</h5>
                    <p>{"*".repeat(this.state.password.length)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
