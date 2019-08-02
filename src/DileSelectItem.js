import { LitElement, html, css } from 'lit-element';

export class DileSelectItem  extends LitElement {

  static get styles() {
    return css`
      * { box-sizing: border-box; }
      :host {
        display: block;
        cursor: pointer;
        width: var(--dile-select-width, auto);
      }
      section {
        background-color: var(--dile-select-background-color, #ddd);
      }
      div {
        padding-right: var(--dile-select-padding-x, 10px);
        padding-left: var(--dile-select-padding-x, 10px);
        padding-bottom: var(--dile-select-padding-y, 10px);
        padding-top: var(--dile-select-padding-y, 10px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      section:hover{
        background-color: var(--dile-select-hover-background-color, #eee);
        color: var(--dile-select-text-color, #303030);
      }
      .selected {
        background-color: var(--dile-select-selected-background-color, #eee);
        color: var(--dile-select-selected-text-color, #333);
      }
      
    `;
  }

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
    this.dispatchEvent(new CustomEvent('_dile.select-item-anounce-width', {
      bubbles: true,
      composed: true,
      detail: this.clientWidth,
    }));
  }

  render() {
    return html`
      <section @click="${this.select}" class="${this.selected ? 'selected' : ''}">
        <div>
          <slot></slot>
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
