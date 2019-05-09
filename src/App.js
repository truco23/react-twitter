import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import Login from './pages/login/Login';
import Timeline from './pages/timeline/Timeline';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/timeline" component={ Timeline } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
