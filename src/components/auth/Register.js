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
      .then(() => this.props.history.push('/trades'));
  }

  handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <article className="pa4 black-80">
        <form onSubmit={this.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email">Username</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure" name="username" onChange={this.handleChange} value={this.state.username || ''}/>
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email">Email address</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email" onChange={this.handleChange} value={this.state.email || ''}/>
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  onChange={this.handleChange} value={this.state.password || ''}/>
            </div>
          </fieldset>
          <div className="mt3">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"/>
          </div>
        </form>
      </article>
    );
  }
}

export default Register;
