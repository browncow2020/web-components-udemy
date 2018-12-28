class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'This is default tooltip text';
        this.attachShadow({ mode: 'open' });
        const template = document.querySelector('#tooltipTemplate');
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        // const tooltipIcon = document.createElement('span');
        const tooltipIcon = this.shadowRoot.querySelector('span');
        // tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        // console.log('it works!!!');
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this._tooltipContainer.style.border = '1px dotted #000';
        // this._tooltipContainer.style.color = '#000';
        this._tooltipContainer.style.position = 'absolute';
        this._tooltipContainer.style.zIndex = '10';
        this.shadowRoot.appendChild(this._tooltipContainer);
    }
    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }

}

customElements.define('aileron-tooltip', Tooltip);