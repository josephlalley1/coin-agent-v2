import React from 'react';
import axios from 'axios';
import { handleChange } from '../../lib/common';
import { decodeToken } from '../../lib/auth';

export default class TradeNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionAddedBy: decodeToken().sub
    };
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit handled', this.state);
    axios.post('/api/trades', this.state)
      .then(() => this.props.history.push('/trades'));
  }

  render() {
    return(
      <main>
        <div>
          <div className="add-trade-container">
            <h2 className="heading trading-titles">Add a trade</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <p className="body input-labels">Coin Name</p>
                <input className="input-box" onChange={this.handleChange} value={this.state.coinName || ''} name="coinName" />
              </div>
              <div>
                <p className="body input-labels">Coin Symbol</p>
                <input className="input-box" onChange={this.handleChange} value={this.state.symbol || ''} name="symbol" />
              </div>
              <div>
                <p className="body input-labels">Amount</p>
                <input className="input-box" onChange={this.handleChange} value={this.state.transactionTotal || ''} name="transactionTotal" />
              </div>
              <div>
                <input className="button-small add-trade-button" type="submit" value="Add trade"/>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
