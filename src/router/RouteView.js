import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routers from './routers'
export default function RouterView() {
  return (
    <BrowserRouter>
      <Routers></Routers>
    </BrowserRouter>
  )
}
