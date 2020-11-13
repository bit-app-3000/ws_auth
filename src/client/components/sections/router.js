import { router } from 'redom'
import { FormAuth, Contact, Home } from '../../components'


export const AppRouter = router('main',
  {
    home: Home,
    auth: FormAuth,
    contact: Contact
  })
