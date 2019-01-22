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
      <main>
        <div>
          <div className="add-trade-container">
            <h2 className="heading trading-titles">Edit your trade</h2>
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
                <input className="button-small add-trade-button" type="submit" value="Edit trade"/>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default TradeEdit;
