import React from 'react';
import axios from 'axios';
import { handleChange } from '../../lib/common';

class TradeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(`/api/trades/${this.props.match.params.id}`)
      .then(result => {
        this.setState({
          trade: result.data
        });
        console.log('this is this.state', this.state);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit handled', this.state);
    axios.put(`/api/trades/${this.props.match.params.id}`, this.state)
      .then(() => this.props.history.push(`/trades/${this.props.match.params.id}`));
  }

  render() {
    return(
      <main className="pa4 black-80">
        <form className="measure center" onSubmit={this.handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0"></legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Coin Name</label>
              <input className="pa2 input-reset ba bg-transparent w-100" onChange={this.handleChange} value={this.state.coinName || ''} name="coinName" />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Coin Symbol</label>
              <input className="pa2 input-reset ba bg-transparent w-100" onChange={this.handleChange} value={this.state.symbol || ''} name="symbol" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Amount</label>
              <input className="b pa2 input-reset ba bg-transparent w-100" onChange={this.handleChange} value={this.state.transactionTotal || ''} name="transactionTotal" />
            </div>
          </fieldset>
          <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Add trade"/>
          </div>
        </form>
      </main>
    );
  }
}

export default TradeEdit;
