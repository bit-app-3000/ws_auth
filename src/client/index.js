import { el, setChildren } from 'redom'
import { AppRouter, NavMain } from './components'
import { authInit, initWebSocket } from './listeners'
import { ERR } from './modules'

authInit().catch(ERR)
initWebSocket()

const page = [el('header', NavMain), AppRouter]

setChildren(document.body, page)

AppRouter.update('auth', {})
