/* eslint-disable no-nested-ternary */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import routers from './../router/routers'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs() {
  const classes = useStyles();
  const breadcrumbNameMap = {}
  routers.forEach(item => {
      if (!item.children) {
        breadcrumbNameMap[item.path] = item.name
      } else {
          item.children.forEach(subItem => {
            breadcrumbNameMap[subItem.path] = subItem.name
          })
      }
  })
  console.log(breadcrumbNameMap, '====')
  return (
    <div className={classes.root}>
        <Route>
          {({ location }) => {
            const pathnames = location.pathname.split('/').filter((x) => x);
            return (
              <Breadcrumbs aria-label="breadcrumb">
                <LinkRouter color="inherit" to="/">
                  Home
                </LinkRouter>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1;
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                  return last ? (
                    <Typography color="textPrimary" key={to}>
                      {breadcrumbNameMap[to]}
                    </Typography>
                  ) : (
                    <LinkRouter color="inherit" to={to} key={to}>
                      {breadcrumbNameMap[to]}
                    </LinkRouter>
                  );
                })}
              </Breadcrumbs>
            );
          }}
        </Route>
      </div>
  );
}
