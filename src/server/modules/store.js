import { credentials } from '@grpc/grpc-js'
import { map, runEffects } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'
import { count$, ERR, guid, loadProto, LOG, NO_OP, set$ } from '../../shared/module'

const { API_HOST, API_PORT, STORE_HOST, STORE_PORT } = process.env
const proto = loadProto('store')

const BIND_ADDRESS = `${STORE_HOST}:${STORE_PORT}`

const CREDENTIALS = credentials.createInsecure()

const store = null
let $ = null

function getStore () {
  return store || new proto.store.Store(BIND_ADDRESS, CREDENTIALS)
}

function create$ () {
  $ = getStore().Set(NO_OP, (err, res) => err ? ERR('Stream:', err) : LOG('Stream:', res))
  return $
}

function get$ () {
  return $ || create$()
}

const tx = { cid: 'test' }
const scheduler = newDefaultScheduler()

function SetItem () {
  const id = guid()
  const data = [{ id, name: 'test', created: Date.now() }]

  get$().write({ tx, data })
}

function CountItem () {
  getStore().Count({ tx }, (err, data) => err ? ERR(err) : LOG(data))
}

runEffects(map(CountItem, count$), scheduler).catch(ERR)
runEffects(map(SetItem, set$), scheduler).catch(ERR)
