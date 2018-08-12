import customAttributes from 'https://unpkg.com/custom-attributes@1.1.3/index.js';

class StateStore extends HTMLElement {
  constructor() {
    super();
    this.store = new Map();

    for(let [name, value] of Object.entries(this.dataset)) {
      this.store.set(name, value);
      this._notify(name);
    }
  }

  connectedCallback() {
    this.addEventListener('state-prop', this);
  }

  handleEvent(ev) {
    let { prop, value } = ev.detail;
    this.store.set(prop, value);
    this._notify(prop);
  }

  _notify(prop) {
    let value = this.store.get(prop);
    for(let el of this.querySelectorAll(`[data-bind="${prop}"]`)) {
      switch(el.nodeName) {
        case 'SPAN':
          el.textContent = value;
          break;
        case 'INPUT':
          el.value = value;
      }
    }
  }
}

class DataBind {
  connectedCallback() {
    let ds = this.ownerElement.dataset;
    this.prop = ds.bind;
    this.eventName = ds.bindOn;
    this.from = ds.bindFrom;

    this.ownerElement.addEventListener(this.eventName, this);
  }

  handleEvent(ev) {
    let value = ev.target[this.from];
    let propEvent = new CustomEvent('state-prop', {
      bubbles: true,
      detail: {
        prop: this.prop,
        value
      }
    });
    this.ownerElement.dispatchEvent(propEvent);
  }
}

customAttributes.define('data-bind', DataBind);
customElements.define('state-store', StateStore);
