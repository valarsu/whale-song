import React from 'react'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import ArticlesList from './List'
import ArticlesDetail from './Detail'
export default function Articles() {
  const { path } = useRouteMatch()
  const history = useHistory()
  if (path === window.location.pathname) {
    history.push(`articles/list`)
  }
  return (
    <div>
      <Switch>
        <Route path={`${path}/list`} component={ArticlesList} />
        <Route path={`${path}/:articleId`} component={ArticlesDetail} />
      </Switch>
    </div>
  )
}
