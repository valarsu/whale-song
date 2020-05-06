import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ArticlesList from './List'
import ArticlesDetail from './Detail'
export default function Articles() {
  const { path } = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route path={`${path}/list`} component={ArticlesList} />
        <Route path={`${path}/:articleId`} component={ArticlesDetail} />
      </Switch>
    </div>
  )
}
