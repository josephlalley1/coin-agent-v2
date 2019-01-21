import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, deleteToken } from '../lib/auth';
import { decodeToken } from '../lib/auth';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/');
    console.log('logged out');
  }


  render() {
    const username = decodeToken().username;
    return (
      <nav>
        <Link to="/">
          <h2>Coin Agent</h2>
        </Link>
        <div>
          {isAuthenticated() && <Link to="/dashboard">Dashboard</Link>}
          {isAuthenticated() && <Link to="/trades">Trades</Link>}
          {!isAuthenticated() && <Link to="/login">Log in</Link>}
          {!isAuthenticated() && <Link to="/register">Get an account</Link>}
          {isAuthenticated() && <a onClick={this.handleLogout}>Log out</a>}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
