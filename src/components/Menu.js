import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { makeStyles } from '@material-ui/core';
import menuList from './../router/menuList'
import { useHistory } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}))

export default function MainMenu() {
  const classes = useStyles()
  const history = useHistory()
  const turnPage = (url) => () => {
    history.push(url)
  }
  return (
    <div
      className={classes.list}
      role="presentation"
    >
      <List>
        {menuList.map((menu, index) => (
          <ListItem button key={menu.path} onClick={turnPage(menu.path)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={menu.title}/>
          </ListItem>
        ))}
      </List>
    </div>
  )
}