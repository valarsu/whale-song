import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App';
import Inbox from './inbox/Inbox'
import About from './about/About'

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={App} />
        <Route path="/about" component={About} />
        <Route path="/inbox" component={Inbox} />
      </BrowserRouter>
    )
  }
}

export default Routes