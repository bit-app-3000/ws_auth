import { WS_CONNECT } from '../configs'
import { ERR, loadScript, LOG } from '../modules'

const connect = () => window.Primus.connect(WS_CONNECT, {})

const initWebSocket = () => {
  loadScript('/js/ws.js')
    .then(connect)
    .then(client)
    .catch(e => ERR('LOAD', e))
}

const periodic = ws => () => {
  LOG('Open Client')
  setInterval(() => ws.emit('test', { MO: { test: Date.now() } }), 3000)
}

const client = ws => {
  LOG('WS Client', { ws })
  
  ws
    .on('open', periodic(ws), ws)
    .on('auth', data => {
      LOG('auth', { data })
      setInterval(() => ws.emit('test', { MO: { test: Date.now() } }), 500)
    })
    .on('test', LOG)
    .on('error', e => LOG('ERROR', e))
    
    // .on('incoming::open', e => LOG('incoming::open', e))
    // .on('incoming::end', e => LOG('incoming::end', e))
    //
    // .on('outgoing::reconnect', e => LOG('outgoing::reconnect', e))
    // .on('outgoing::open', e => LOG('outgoing::open', e))
    // .on('outgoing::end', e => LOG('outgoing::end', e))
    
    .on('outgoing::open', function (e) {
      console.log(e)
    })
    
    .on('outgoing::error', function (e) {
      console.log('outgoing::error', e)
    })
    .on('incoming::error', function (e) {
      console.log('incoming::error', e)
      console.log(ws)
    })
    
    .on('end', (...res) => LOG('END', { res }))
    .on('close', (...res) => LOG('CLOSE', { res }))
    .on('destroy', (...res) => LOG('Destroy', { res }))
}

/*const initWebSocket = () => {
  
  try {
    
    const socket = new WebSocket(WS_CONNECT)
    
    socket.onopen = function (event) {
      LOG('open', event)
    }
    
    socket.onmessage = function (event) {
      LOG('message', event)
    }
    
    socket.onerror = function (event) {
      LOG('close', event.code)
      LOG('close', event.reason)
      LOG('close', event.wasClean)
      socket.close()
    }
    
    socket.onclose = function (event) {

      LOG('close', event.code)
      LOG('close', event.reason)
      LOG('close', event.wasClean)
  
    }
    
  } catch (e) {
    ERR(e)
  }
  
}*/

export { initWebSocket }
