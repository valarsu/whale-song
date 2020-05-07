import React from 'react'
// import CodeMirror from './CodeMirror'

export default function Editor(props) {
  return (
    <form className="editor pure-form">
      <textarea value={props.value} onChange={props.onChange}></textarea>
    </form>
  )
}
