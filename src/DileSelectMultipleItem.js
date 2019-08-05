import { LitElement, html, css } from 'lit-element';
import { dileSelectItemStyles } from './styles/dile-select-item-styles';
import { DileSelectItemMixin } from './mixins/dile-select-item-mixin';
import 'dile-checkbox/dile-checkbox';

export class DileSelectMultipleItem  extends DileSelectItemMixin(LitElement) {

  static get styles() {
    return [dileSelectItemStyles, css`
      .content {
        display: flex;
        align-items: center;        
        --dile-checkbox-size: 16px;
        --dile-checkbox-unchecked-color: var(--dile-select-multiple-unchecked-color, #aaa);
        --dile-checkbox-checked-color: var(--dile-select-multiple-checked-color, #26e);
      }
      dile-checkbox {
        position: relative;
        top: 1px;
      }

      
    `];
  }

  constructor() {
    super();
    this.addEventListener('click', (e) => e.stopPropagation() );
  }

  get contentTemplate() {
    return html`<dile-checkbox ?checked="${this.selected ? 'checkselected' : ''}"></dile-checkbox> <slot></slot>`;
  }


}
