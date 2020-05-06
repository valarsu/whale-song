import React from 'react'
import ListItem from '../../components/articles/ListItem'
import { makeStyles } from '@material-ui/core'
// import classes from '*.module.css'
function lists () {
  let lists = []
  for (let i = 0; i < 10; i++) {
    lists[i] = i
  }
  return lists
}
let Lists = lists()
const useStyles = makeStyles({
  listWrapper: {
    display: 'flex',
  },
  left: {
    flex: 1
  },
  right: {
    flex: 5
  }
})
export default function List() {
  const classes = useStyles()

  // constructor(props) {
  //   super(props)
  // }
  return (
    <div className={classes.listWrapper}>
      <div className={classes.left}>
      </div>
      <div className={classes.right}>
        {
          Lists.map((item, key) => {
            return (<ListItem key={key}></ListItem>)
          })
        }
      </div>
    </div>
  )
}
