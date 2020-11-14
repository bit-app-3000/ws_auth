import { router } from 'redom'
import { Contact, Home, Login } from './sections'

export const Router = router('main',
  {
    home: Home,
    login: Login,
    contact: Contact
  })
