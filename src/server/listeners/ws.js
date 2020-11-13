import { promises, writeFileSync } from 'fs'
import Primus from 'primus'
import Emit from 'primus-emit'

import { JS, WS, WS_OPTS } from '../configs'
import { ERR, LOG, NO_OP } from '../modules'

const listeners = spark => {
  LOG('WS SUBSCRIBE SPARK')
  
  spark
    .on('test', data => LOG('from client', data))
  
  setInterval(() => spark.emit('test', { MT: { test: Date.now() } }), 3000)
}

const authorization = (spark, done) => {
  LOG('WS AUTH', Date.now())
  return spark.emit('auth', new TypeError('err.message'))
}

const init = ws => () => {
  
  LOG('WS SERVER INIT')
  
  ws
    .on('connection', authorization)
    .on('connection', listeners)
    .on('disconnection', s => LOG('disconnection'))
    .on('error', e => ERR('SPARK', e))
  
}

//authorization
export const initWS = () => {
  
  const ws = Primus.createServer(NO_OP, { ...WS_OPTS, iKnowHttpsIsBetter: false, plugin: { Emit } })
  
  console.time('saveWsClient')
  promises
    .mkdir(JS, { recursive: true })
    .then(() => writeFileSync(WS, ws.library()))
    .catch(ERR)
  
  console.timeEnd('saveWsClient')
  ws.once('initialised', init(ws))
}
