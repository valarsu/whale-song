import React from 'react'
import { makeStyles } from '@material-ui/core'
// import CodeMirror from './CodeMirror'
const useStyles = makeStyles({
  editor: {
    width: '100%',
    height: '600px'
  }
})
export default function Editor(props) {
  const classes = useStyles()
  return (
    <form className="editor pure-form">
      <textarea className={classes.editor} value={props.value} onChange={props.onChange}></textarea>
    </form>
  )
}
