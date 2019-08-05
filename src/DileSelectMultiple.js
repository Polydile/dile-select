import { html, css, LitElement } from 'lit-element';
import '../dile-select-multiple-item';
import { DileCloseDocumentClickMixin } from 'dile-close-document-click-mixin/dile-close-document-click-mixin.js';
import { DileSelectMixin } from './mixins/dile-select-mixin';
import { dileSelectStyles } from './styles/dile-select-styles';

export class DileSelectMultiple extends DileSelectMixin(DileCloseDocumentClickMixin(LitElement)) {
  static get properties() {
    return {
      value: { type: Array },
      labelNumItem: { type: Array },
    }
  }
  static get styles() {
    return [dileSelectStyles, css`
      
    `];
  }
  constructor() {
    super();
    this.multiple = true;
    this.value = [];
    this.labelNumItem = "Items selected";
  }

  _userItemSelected(e) {
    console.log('_userItemSelected');
    this.selectItem(e.detail.value);
    //this.close();
  }

  firstUpdated() {
    super.firstUpdated();
    this.setSelectedOnItems();
  }

  selectItem(value) {
    this.uninitialized = false;
    if(this.value.indexOf(value) != -1) {
      // El elemento estaba, lo quito de los values
      this.value = this.value.filter( item => item != value );
    } else {
      // El elemento no estaba, lo pongo
      this.value.push(value);
    }
    this.setSelectedOnItems();
    this.dispatchSelectedEvent();
    
  }

  setSelectedOnItems() {
    for(let ele of this.items) {
      if(this.value.indexOf(ele.value) != -1) {
        // El elemento está entre los values
        ele.selected = true;
      } else{
        // El elemento no está entre los values
        ele.selected = false;
      }
    }
    this.selectedText = `${this.value.length} ${this.labelNumItem}`;
    if(this.value.length == 0) {
      this.uninitialized = true;
    }
  }

  dispatchSelectedEvent() {
    this.dispatchEvent(new CustomEvent('dile-select-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selectedText: this.selectedText,
        value: this.value,
        name: this.name,
      }  
    }));
  }
}
