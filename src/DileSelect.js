import { html, css, LitElement } from 'lit-element';
import '../dile-select-item';
import { DileCloseDocumentClickMixin } from 'dile-close-document-click-mixin/dile-close-document-click-mixin.js';

export class DileSelect extends DileCloseDocumentClickMixin(LitElement) {
  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: inline-block;
        position: relative;
        min-width: var(--dile-select-width, auto);
        max-width: var(--dile-select-width, auto);
        box-sizing: content-box;
      }
      .select {
        overflow: hidden;
        color: var(--dile-select-text-color, #303030)
      }
      .main {
        background-color: var(--dile-select-background-color, #ddd);
        border-width: var(--dile-select-border-width, 0);
        border-color: var(--dile-select-border-color, #888);
        border-style: solid;
        border-radius: var(--dile-select-border-radius, 10px);
        cursor: pointer;
      }
      #maincontent{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .main:hover{
        background-color: var(--dile-select-hover-background-color, #eee);
      }
      
      span {
        padding-right: var(--dile-select-padding-x, 10px);
        padding-left: var(--dile-select-padding-x, 10px);
        padding-bottom: var(--dile-select-padding-y, 10px);
        padding-top: var(--dile-select-padding-y, 10px);
        width: 100%;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .ctrl {
        margin: 3px 10px 0 15px;
      }
      .options {
        overflow: hidden;
        height: 0;
        position: absolute;
        z-index: 2;
        border-bottom-left-radius: var(--dile-select-border-radius, 10px);
        border-bottom-right-radius: var(--dile-select-border-radius, 10px);
      }
      .mainOpened {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-width: 0;
        
      }
      .opened {
        border-width: var(--dile-select-border-width, 0);
        border-color: var(--dile-select-border-color, #888);
        border-style: solid;
        border-top-width: 0;                
        height: auto;
      }
      .crltOpened {
        transform: rotate(180deg);
        margin-top: 0;
        margin-bottom: 1px;
      }
      .placeholder {
        display: inline;
        opacity: 0.3;
      }
    `;
  }

  static get properties() {
    return {
      value: { type: String },
      name: { type: String },
      opened: { type: Boolean },
      selectedText: { type: String },
      placeholder: { type: String },
      uninitialized: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.placeholder = 'Select';
  }

  get items() {
    let items = [];
    let domItems = this.children;
    for (let ele of domItems) {
      items.push(ele);
    }
    return items;
  }
  _createItemsArray() {
      this.items = [];
      let domItems = this.children;
      for (let ele of domItems) {
        this.items.push(ele);
      }
  }

  firstUpdated() {
    if(this.value) {
      this.selectItem(this.value);
    } else if (!this.uninitialized) {
      this.selectItem(0);
    }
    this._setWidthInItems();
  }

  _setWidthInItems() {
    if(getComputedStyle(this).getPropertyValue('--dile-select-width')) {
      let targetWidth = this.shadowRoot.getElementById('maincontent').clientWidth;
      for(let ele of this.items) {
        ele.style.minWidth = targetWidth + 'px'
        ele.style.maxWidth = targetWidth + 'px'
      }
    }
  }
  render() {
    return html`
      <section class="select" @dile-select-item-selected="${this.userItemSelected}" @_dile.select-item-anounce-width="${this.manageWidth}">
        <div class="main ${this.opened ? 'mainOpened' : ''}" @click=${this._toggleHandler} id="main">
          <div id="maincontent">
            <span>
              ${this.opened || this.uninitialized
                ? html`<div class="placeholder">${this.placeholder}&nbsp;</div>`
                : html`${this.selectedText}`
              }
              </span>
            <div class="ctrl ${this.opened ? 'crltOpened' : ''}">${this.arrowIcon}</div>
          </div>
        </div>
        
        <div class="options ${this.opened ? 'opened' : ''}" id="options">
          <slot></slot>
        </div>
      </section>
    `;
  }

  _toggleHandler(e) {
    e.stopPropagation();
    this.closeOthers();
    this._setWidthInItems();
    this.opened = !this.opened;
  }

  get arrowIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>`;
  }

  selectItem(value) {
    this.uninitialized = false;
    if(! value) {
      value = this.items[0].value;
    }
    let alreadySelected = false;
    for(let ele of this.items) {
      if(ele.value == value && !alreadySelected) {
        ele.selected = true;
        this.selectedText = ele.textContent;
        this.value = ele.value;
        this.dispatchEvent(new CustomEvent('dile-select-changed', {
          bubbles: true,
          composed: true,
          detail: {
            selectedText: this.selectedText,
            value: this.value
          }
        }));
      } else {
        ele.selected = false
      }
    }
  }

  userItemSelected(e) {
    this.selectItem(e.detail.value);
    this.close();
  }

  close() {
    this.opened = false;
  }
  open() {
    this._setWidthInItems();
    this.opened = true;
  }

  manageWidth(e) {
    if(this.offsetWidth < e.detail) {
      let customBorder = this.getCustomBorder()
      if(customBorder) {
        this.shadowRoot.getElementById('main').style.width = (e.detail + (customBorder * 2)) + 'px';
      } else {
        this.shadowRoot.getElementById('maincontent').style.width = (e.detail  + 'px');
      }
    }
  }

  getCustomBorder() {
    let customBorder = getComputedStyle(this).getPropertyValue('--dile-select-border-width');
    let borderVal = parseInt(customBorder);
    if(customBorder && !isNaN(borderVal) && borderVal) {
      return borderVal
    }
    return 0;
  }

  updated(changedProperties) {
    if(changedProperties.has('opened')) {
      let section = this.shadowRoot.querySelector('section');
      let border = this.getCustomBorder();
      if(border && this.opened) {
        section.style.marginBottom = border + 'px';
      } else if(border) {
        section.style.marginBottom = '0';
      }
    }
  }
}
