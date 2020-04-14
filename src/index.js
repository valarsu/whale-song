import React from 'react';
import ReactDOM from 'react-dom';
import RouteView from './router/RouteView'
import { Provider } from "mobx-react"
import store from './store'
import 'typeface-roboto';
import './index.css';
import c from './sum'
let b
setTimeout(() => {

  b = c + 1

}, 0)
console.log(b)

ReactDOM.render((
  <Provider {...store}>
    <RouteView />
  </Provider>
), document.getElementById('root'));
