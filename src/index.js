import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './page/Routes'
import { Provider } from "mobx-react"
import store from './store'
import 'typeface-roboto';
import './index.css';
import c from './sum'
let b
setTimeout(() => {

  b = c + 1

}, 0)

ReactDOM.render((
  <Provider {...store}>
    <Routes />
  </Provider>
), document.getElementById('root'));
