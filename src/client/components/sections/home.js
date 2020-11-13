import { el } from 'redom'



export class Home {
  constructor() {
    this.el = el('h1', 'Hello 555')
  }
  update(data) {
    this.el.textContent = "Hello " + data + "!"
  }
}
