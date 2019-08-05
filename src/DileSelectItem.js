import { LitElement, html, css } from 'lit-element';
import { dileSelectItemStyles } from './styles/dile-select-item-styles';
import { DileSelectItemMixin } from './mixins/dile-select-item-mixin';

export class DileSelectItem  extends DileSelectItemMixin(LitElement) {

  static get styles() {
    return [dileSelectItemStyles, css`
      
      
    `];
  }
  
  get contentTemplate() {
    return html`<slot></slot>`;
  }

  
}
