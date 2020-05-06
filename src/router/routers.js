import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './../page/App';
import About from './../page/about/About'
import Articles from './../page/articles'
export default function Routers() {
    return (
        <div>
            <Route path="/" component={App} />
            <Switch>
                <Route path="/about" component={About} />
                <Route path="/articles" component={Articles} />
            </Switch>
        </div>
    )
}