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
  }


  render() {
    const username = decodeToken().username;
    return (
      <nav className="dt w-100 border-box pa3 ph5-ns bb b--light-gray">
        <Link to="/" className="dtc v-mid mid-gray link dim w-25">
          <h2 className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns site-title">Coin Agent</h2>
        </Link>
        <div className="dtc v-mid w-75 tr">
          {isAuthenticated() && <h2 className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">Welcome back, {username.replace(/^\w/, c => c.toUpperCase())}</h2>}
          {isAuthenticated() && <Link to="/trades" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">My portfolio</Link>}
          {isAuthenticated() && <Link to="/trades/new" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">Add a trade</Link>}
          {!isAuthenticated() && <Link to="/register" className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns">Register</Link>}
          {!isAuthenticated() && <Link to="/login" className="link dim dark-gray f6 f5-ns dib">Log in</Link>}
          {isAuthenticated() && <Link to="/trades" className="link dim dark-gray f6 f5-ns dib" onClick={this.handleLogout}>Log out</Link>}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
