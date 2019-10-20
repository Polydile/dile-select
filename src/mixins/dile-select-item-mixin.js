import { html } from 'lit-element';

export const DileSelectItemMixin = (Superclass) => class extends Superclass {

  static get properties() {
    return {
      selected: { type: Boolean },
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.value = '';
  }

  firstUpdated() {
    let cssCustomWidth = getComputedStyle(this).getPropertyValue('--dile-select-width');
    if(!cssCustomWidth) {
      this.shadowRoot.querySelector('section').style.paddingRight = '45px';
    }
    this.dispatchEvent(new CustomEvent('dile-select-item-initialized', {
      bubbles: true,
      composed: true,
      detail: this
    }));
  }

  render() {
    return html`
      <section @click="${this.select}" class="${this.selected ? 'selected' : ''}">
        <div class="content">
          ${this.contentTemplate}
        </div>
      </section>
    `;
  }

  select() {
    this.dispatchEvent(new CustomEvent('dile-select-item-selected', {
      bubbles: true,
      composed: true,
      detail: this
    }));
  }
  
  
}