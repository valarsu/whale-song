import React from 'react'
import websocket from './../../utils/websocket'
// import { observer, inject } from 'mobx-react'
websocket.start({
  url: 'ws://127.0.0.1:1024',
  uid: 1,
  tk: 'xxx',
  aid: 2
})
websocket.on('message', function (msg) {
  console.log(msg)
})
// @inject('AppStore')
// @observer
export default function About() {
  return (
    <div>
      <h2>About</h2>
      <p>你好 再见</p>
    </div>
  )
}
