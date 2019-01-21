import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TradeIndex from './components/trades/Index';
import TradeNew from './components/trades/TradeNew';
import TradeShow from './components/trades/TradeShow';
import TradeEdit from './components/trades/TradeEdit';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/Header';

import './scss/normalize.scss';
import './scss/theme.scss';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <main>
            <Header />
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/dashboard' component={Dashboard}/>
              <Route exact path='/trades' component={TradeIndex}/>
              <Route exact path='/trades/new' component={TradeNew}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route path="/trades/:id/edit" component={TradeEdit} />
              <Route path="/trades/:id" component={TradeShow} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
