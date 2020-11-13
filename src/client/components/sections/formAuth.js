import { el, text } from 'redom'
import { authEmailPassword } from '../../listeners'
import { clone, LOG, store } from '../../modules'

const def = {
  email: '',
  password: ''
}

store.set('auth', clone(def))

const up = form => {
  
  const formData = new FormData(form)
  
  const state =
    Array
      .from(formData.entries())
      .reduce((acc, [k, v]) => {
        acc[k] = v
        return acc
      }, {})
  
  store.set('auth', state)
}

const field = ({ item, label }) =>
  el('div.field', {}, [
    el('label', {}, [
      text(label),
      item
    ])
  ])

export class FormAuth {
  
  constructor () {
    
    this.email = el('input', { type: 'text', name: 'email' })
    this.password = el('input', { type: 'password', name: 'password' })
    //this.google = el('button', {  textContent: 'by google' })
    
    this.el = el('form', { name: 'SignIn', method: 'post' }, [
      field({ item: this.email, label: 'email' }),
      field({ item: this.password, label: 'password' }),
      // el('button', { type: 'reset', textContent: 'reset' }),
      el('button', { type: 'submit', textContent: 'submit' }),
     // this.google
    ])
  
    // this.google.onclick = e => {
    //   e.preventDefault()
    //   authPopUp()
    // }
    
    this.el.oninput = e => {
      e.preventDefault()
      this.update(up(this.el))
    }
    
    this.el.onreset = e => {
      e.preventDefault()
      this.update(store.set('auth', clone(def)))
    }
    
    this.el.onsubmit = e => {
      LOG('submit')
      e.preventDefault()
      authEmailPassword(store.get('auth'))
      
      // this.update(store.set('auth', clone(def)))
    }
  }
  
  update () {
    const { email, password } = store.get('auth')
    this.email.value = email
    this.password.value = password
  }
}
