class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.50);
          z-index: 10;
          display: none;
        }
        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background-color: #fff;
          border-color: #fff;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          display: none;
        }
        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }
        ::slotted(h2) {
          font-size: 1.35rem;
          margin: 0;
        }
        ::slotted(h3) {
          font-size: 1.15rem;
          margin: 0;
        }
        #modal-main {
          padding: 1rem;
        }
        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-start;
        }
        #actions button {
          margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-heading" aria-describedby="modal-main" tabindex="-1">
        <header id="modal-heading" tabindex="0">
          <slot name="title"></slot>
          <slot name="subtitle"></slot>
        </header>
        <section id="modal-main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="btn-confirm">Okay</button>
          <button id="btn-cancel">Cancel</button>
        </section>
      </div>
    `
    const cancelButton = this.shadowRoot.querySelector('#btn-cancel');
    const confirmButton = this.shadowRoot.querySelector('#btn-confirm');
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
  }

  attributeChangedCallback (name, oldValue, newValue){
    if(name === 'opened'){
      if (this.hasAttribute('opened')){
        this.shadowRoot.querySelector('#backdrop').style.display = 'block';
        this.shadowRoot.querySelector('#modal').style.display = 'block';
        this.shadowRoot.querySelector('#modal').style.poinerEvents = 'all';
        document.querySelector('main').setAttribute('aria-hidden', 'true');
      } else {
        this.shadowRoot.querySelector('#backdrop').style.display = 'none';
        this.shadowRoot.querySelector('#modal').style.display = 'none';
        this.shadowRoot.querySelector('#modal').style.poinerEvents = 'none';
        document.querySelector('main').setAttribute('aria-hidden', 'false');
      }
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }
  
  open() {
    this.setAttribute('opened', '');
  }
  hide() {
    if(this.hasAttribute('opened')){
      this.removeAttribute('opened');
    }
  }

  _cancel(event) {
    this.hide();
    // const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    // event.target.dispatchEvent(cancelEvent);
    const cancelEvent = new Event('cancel');
    this.dispatchEvent(cancelEvent);

  }
  _confirm(event) {
    this.hide();
    // const confirmEvent = new Event('confirm', { bubbles: true, composed: true });
    // event.target.dispatchEvent(confirmEvent);
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('uc-modal', Modal);