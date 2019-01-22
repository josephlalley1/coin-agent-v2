import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(result => {
        saveToken(result.data.token);
        this.props.history.push('/trades/new');
      });
  }

  handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="add-trade-container margin-login">
          <h2 className="heading trading-titles">Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p className="body input-labels">Email</p>
              <input className="input-box" type="email" name="email" onChange={this.handleChange} value={this.state.email || ''}/>
            </div>
            <div>
              <p className="body input-labels">Password</p>
              <input className="input-box" type="password" name="password" onChange={this.handleChange} value={this.state.password || ''}/>
            </div>
            <div>
              <input className="button-small add-trade-button" type="submit" value="Log in"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
