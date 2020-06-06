import React from 'react';
import ReactDOM from 'react-dom';
import RouteView from './router/RouteView'
// import App from './page/App'
import { Provider } from "mobx-react"
import store from './store'
import 'typeface-roboto';
import './index.css';

ReactDOM.render((
  <Provider {...store}>
    <RouteView />
  </Provider>
), document.getElementById('root'));
