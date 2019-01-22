import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(() => this.props.history.push('/login'));
  }

  handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="add-trade-container margin-login">
          <h2 className="heading trading-titles">Get an account</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <p className="body input-labels">Username</p>
              <input className="input-box" name="username" onChange={this.handleChange} value={this.state.username || ''}/>
            </div>
            <div>
              <p className="body input-labels">Email</p>
              <input className="input-box" type="email" name="email" onChange={this.handleChange} value={this.state.email || ''}/>
            </div>
            <div>
              <p className="body input-labels">Password</p>
              <input className="input-box" type="password" name="password" onChange={this.handleChange} value={this.state.password || ''}/>
            </div>
            <div>
              <input className="button-small add-trade-button" type="submit" value="Sign up"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
