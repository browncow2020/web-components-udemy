class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = 'This is default tooltip text';
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.35rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                }
                :host {
                    position: relative;
                }
                .icon {
                    background: #000;
                    color: #fff;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
                
            </style>
            <slot>Default text</slot>
            <span class="icon" aria-labelledby="tooltipContent" tabindex="0" role="button">?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        // const tooltipIcon = document.createElement('span');
        this._tooltipIcon = this.shadowRoot.querySelector('span');
        // tooltipIcon.textContent = ' (?)';
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('focus', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this._tooltipIcon.addEventListener('blur', this._hideTooltip.bind(this));
        // this.shadowRoot.appendChild(tooltipIcon);
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('focus', this._showTooltip);
        this._tooltipIcon.removeEventListener('blur', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.setAttribute('id', 'tooltipContent');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }
    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

}

customElements.define('aileron-tooltip', Tooltip);