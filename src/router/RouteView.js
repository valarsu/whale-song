import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import routers from './routers'
export default function RouterView() {
  // constructor(props) {
  //   super(props)
  // }
  return (
    <BrowserRouter>
      {
        routers.map((item, key)=> {
          if (!Array.isArray(item.children)) {
            return <Route path={item.path} key={key} component={item.component} ></Route>
          } else {
            return <Route path={item.path} key={key}>
              {
                item.children.map((subItem, subKey) => {
                  return <Route path={`${item.path}/${subItem.path}`} key={subKey} component={subItem.component} ></Route>
                })
              }
            </Route>
          }
          
          // return <Route path={item.path} key={key}  render={
          //   (props)=>{
          //     return <item.component {...props} />
          //   }
          // }/>
          
        })
      }
    </BrowserRouter>
  )
}
