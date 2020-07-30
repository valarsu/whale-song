// websocket实例
var ws
let start = function (wsData) {
  // 如果uid为空，不创建连接
  if (!wsData.uid) {
    console.log('%c uid不能为空', 'color: red')
    return false
  }
  /* =============wsData.he====== 配置初始化==================================== */
  // 避免重复连接
  var lockReconnect = false
  // 连接url
  var wsUrl = wsData.url
  // 绑定服务器所需要的请求参数
  var bindData = JSON.stringify({
    code: 2,
    uid: wsData.uid,
    tk: wsData.tk,
    aid: wsData.aid,
    uniqueId: Date.parse(new Date()) / 1000
  })
  // var bindData = `{"code":2,"uid":11899688,"tk":"","aid":3}`
  // 心跳参数
  var pingData = '{"code":0}'
  var heartTime = 30000
  var serverTimeout = 18000
  function createWebSocket(url) {
    try {
      ws = new WebSocket(url)
      console.log(ws)
      initEventHandle()
    } catch (e) {
      reconnect(url)
    }
  }
  function initEventHandle() {
    ws.onclose = function () {
      reconnect(wsUrl)
      EventCenter.fire('close')
    }
    ws.onerror = function () {
      reconnect(wsUrl)
      EventCenter.fire('error')
    }
    ws.onopen = function () {
      ws.send(bindData)
      // 心跳检测重置
      heartCheck.reset().start()
      EventCenter.fire('open')
    }
    ws.onmessage = function (event) {
      console.log(event)
      var body = JSON.parse(event.data)
      if (body.code === 6) {
        ws.send('{"code":7,"id":"' + body.id + '"}')
        EventCenter.fire('message', body)
      }
      // 如果获取到消息，心跳检测重置
      // 拿到任何消息都说明当前连接是正常的
      heartCheck.reset().start()
    }
  }
  function reconnect(url) {
    if (lockReconnect) return
    lockReconnect = true
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      createWebSocket(url)
      lockReconnect = false
    }, 2000)
  }
  // 心跳检测
  var heartCheck = {
    heartTime: heartTime, // 30秒
    timeout: serverTimeout, // 180秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
      clearTimeout(this.timeoutObj)
      clearTimeout(this.serverTimeoutObj)
      return this
    },
    start: function () {
      var self = this
      this.timeoutObj = setTimeout(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        // onmessage拿到返回的心跳就说明连接正常
        ws.send(pingData)
        self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
          // ws.close()// 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
          console.log('断开')
          reconnect(wsData.url)
        }, self.timeout) // 180s
      }, this.heartTime) // 30s
    }
  }
  // 异步，等待页面渲染
  setTimeout(() => {
    createWebSocket(wsUrl)
  }, 1)
}



/** ==========================事件订阅注册============================= */
var EventCenter = (function () {
  var events = {}
  // 绑定事件 添加回调
  function on(evt, handler) {
    events[evt] = events[evt] || []
    events[evt].push({
      handler: handler
    })
  }
  function fire(evt, arg) {
    if (!events[evt]) {
      return
    }
    for (var i = 0; i < events[evt].length; i++) {
      events[evt][i].handler(arg)
    }
  }
  function off(evt, cb) {
    if (cb !== undefined) {
      events[evt] = events[evt].filter(function (ev) {
        return (ev.handler !== cb)
      })
    } else {
      delete events[evt]
    }
  }
  return {
    on: on,
    fire: fire,
    off: off
  }
}())
/** ==========================事件定义============================= */
let status = function () {
  return ws.readyState === 1
}
let on = function (evt, cb) {
  // 不被允许的事件不被监听
  if (evt !== 'open' && evt !== 'message' && evt !== 'close' && evt !== 'error') {
    return false
  }
  EventCenter.on(evt, cb)
}
let off = function (evt, cb) {
  EventCenter.off(evt, cb)
}
let open = function (cb) {
  EventCenter.on('open', cb)
}
let close = function (cb) {
  EventCenter.on('close', cb)
}
let error = function (cb) {
  EventCenter.on('error', cb)
}
let message = function (cb) {
  EventCenter.on('message', cb)
}
/** ==========================导出============================= */
export default {
  start,
  status,
  on,
  off,
  open,
  close,
  error,
  message
}