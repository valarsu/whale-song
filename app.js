const express= require('express')
const http= require('http')
const app = express()
const WebSocket = require('ws').Server
const server = http.createServer(app)

server.listen('1024', '127.0.0.1', err => {
  if (err) {
    console.log(err)
  }
  console.log('启动成功')
})

const ws = new WebSocket({
  server: server
})

ws.on('connection', function( ws ) {
  ws.on('message', function( data, flags ) {
      const msg = JSON.parse(data)
      if (msg.code === 0) {
        ws.send(JSON.stringify({
          code: 1
        }))
      }
  });
  // 连接关闭，从 Map 中移除，否则长期占据内存
  ws.on('close', function() {
      console.log('stopping client');
  });

});

// 0: 客户端发送心跳
// 1: 服务端回应心跳
// 2: 客户端发送绑定信息
// 3: 服务端回应绑定成功
// 4: 客户端发送消息
// 5: 服务端回应收到消息
// 6: 服务端发送消息
// 7: 客户端回应收到消息