import { html, css, LitElement } from 'lit-element';
import '../dile-select-item';
import { DileCloseDocumentClickMixin } from 'dile-close-document-click-mixin/dile-close-document-click-mixin.js';
import { DileSelectMixin } from './mixins/dile-select-mixin';
import { dileSelectStyles } from './styles/dile-select-styles';

export class DileSelect extends DileSelectMixin(DileCloseDocumentClickMixin(LitElement)) {
  static get properties() {
    return {
      value: { type: String },
    }
  }
  
  constructor() {
    super();
  
    this.addEventListener('dile-select-item-initialized', (e) => {
      if(this.value) {
        this.selectItem(this.value);
      }
    })
  }

  firstUpdated() {
    if(this.value) {
      this.selectItem(this.value);
    } else if (!this.uninitialized) {
      this.selectItem(0);
    }
    super.firstUpdated();
  }
  static get styles() {
    return [dileSelectStyles, css`
      
    `];
  }

  _userItemSelected(e) {
    this.selectItem(e.detail.value);
    this.close();
  }

  selectItem(value) {
    this.uninitialized = false;
    if(! value && this.items[0]) {
      value = this.items[0].value;
    }
    let alreadySelected = false;
    for(let ele of this.items) {
      if(ele.value == value && !alreadySelected) {
        ele.selected = true;
        this.selectedText = ele.textContent;
        this.value = ele.value;
        this.dispatchSelectedEvent();
        alreadySelected = true;
      } else {
        ele.selected = false
      }
    }
    if(!alreadySelected) {
      this.uninitialized = true;
    }
  }

}
