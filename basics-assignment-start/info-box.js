class InfoBox extends HTMLElement {
    constructor() {
        super();
        this._isVisible = false;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #info-box {
                    display: none;
                }
                button {
                    border-color: red;
                    color: red;
                }
            </style>
            <button aria-owns="info-box">Show</button>
            <p id="info-box">
                <slot></slot>
            </p>
        `
        this._infoBoxButton = this.shadowRoot.querySelector('button');
        this._infoBoxContainer = this.shadowRoot.querySelector('#info-box');
        this._infoBoxButton.addEventListener('click', this._toggleInfoBox.bind(this));
    }
    connectedCallback() {
        if (this.hasAttribute('is-visible')){
            if (this.getAttribute('is-visible') === 'true') {
                this._isVisible = true;
                this._infoBoxContainer.style.display = 'block';
                this._infoBoxButton.textContent = 'Hide';
                this._infoBoxButton.setAttribute('aria-expanded', this._isVisible);
            }
        }
    }

    _toggleInfoBox() {
        this._isVisible = !this._isVisible;
        this._infoBoxContainer.style.display = this._isVisible ? 'block' : 'none';
        this._infoBoxButton.textContent = this._isVisible ? 'Hide' : 'Show';
        this._infoBoxButton.setAttribute('aria-expanded', this._isVisible);
    }
}

customElements.define('ba-info-box', InfoBox);