import { el, setChildren } from 'redom'
import { Route } from './actions'
import { NavMain, Router } from './components'
import { ERR } from './modules'

import { authInit } from './modules/auth'

authInit()
  .then(() => setChildren(document.body, [el('header', NavMain), Router]))
  .then(() => Route('login'))
  .catch(e => ERR('LOAD', e))







