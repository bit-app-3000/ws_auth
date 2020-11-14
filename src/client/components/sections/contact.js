import { el } from 'redom'

export class Contact {
  constructor() {
    this.el = el('h2', 'Hello 555')
  }
  update(data) {
    this.el.textContent = "Hello " + data + "!"
  }
}



