import { el, list } from 'redom'
import { LOG } from '../../modules'
import { Route } from '../../actions'

const clone = s => JSON.parse(JSON.stringify(s))
const pages = [{ label: 'home' }, { label: 'login' }, { label: 'contact' }]

class Li {
  
  constructor () {
    
    this.el = el('li', this.link)
    
    this.el.onclick = () => {
      
      const { label, idx } = this.data
      
      const data = clone(pages)
      data[idx].active = true
  
      NavMain.update(data)
  
      Route(label)
 
      
    }
  }
  
  
  update ({ label, active }, idx) {
    
    LOG('update')
    
    this.data = { label, idx }
    this.el.textContent = label
    
    active
      ? this.el.classList.add('active')
      : this.el.classList.remove('active')
    
  }
  
}

export const NavMain = list('nav', Li, 'label')
NavMain.update(pages)
