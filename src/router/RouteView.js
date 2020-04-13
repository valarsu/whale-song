import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import routers from './routers'
class RouterView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        {
          routers.map((item, key)=> <Route path={item.path} key={key} render={(props)=><item.component {...props} routes={item.children} />} />)
        }
      </BrowserRouter>
    )
  }
}

export default RouterView