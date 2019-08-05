import { html } from 'lit-element';

export const DileSelectMixin = (Superclass) => class extends Superclass {
  static get properties() {
    return {
      name: { type: String },
      opened: { type: Boolean },
      selectedText: { type: String },
      label: { type: String },
      placeholder: { type: String },
      _actualPlaceholder: { type: String },
      uninitialized: { type: Boolean },
      errored: { type: Boolean },
    };
  }
  constructor() {
    super();
    this._actualPlaceholder = '';
    this.placeholder = 'Select';
  }

  firstUpdated() {
    this._setWidthInItems();
    this._manageWidth();
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
      ${this.label
        ? html`<label>${this.label}</label>`
        : ''
      }
      <section class="select" @dile-select-item-selected="${this._userItemSelected}" @_dile-select-item-anounce-width="${this._manageWidth}">
        <div class="main ${this.opened ? 'mainOpened' : ''} ${ this.errored ? 'errored' : '' }" @click=${this._toggleHandler} id="main">
          <div id="maincontent">
              ${this.opened || this.uninitialized
                ? html`<span class="placeholder">${this._actualPlaceholder}&nbsp;</span>`
                : html`<span>${this.selectedText}</span>`
              }
            <div class="ctrl ${this.opened ? 'crltOpened' : ''}">${this._arrowIcon}</div>
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

  get _arrowIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>`;
  }

  get items() {
    let items = [];
    let domItems = this.children;
    for (let ele of domItems) {
      items.push(ele);
    }
    return items;
  }

  _manageWidth() {
    this.attempts = 0;
    this._tryManageWidth();
  }
  
  _tryManageWidth() {
    this.attempts ++;
    if(this.attempts <= 3) {
      let items = this.items;
      if(!items.length || !items[0].clientWidth) {
        setTimeout(() => {
          this._tryManageWidth();
        }, 500)
      } else {
        if(this.offsetWidth < items[0].clientWidth) {
          let customBorder = this._getCustomBorder()
          if(customBorder) {
            this.shadowRoot.getElementById('main').style.width = (items[0].clientWidth + (customBorder * 2)) + 'px';
          } else {
            this.shadowRoot.getElementById('maincontent').style.width = (items[0].clientWidth  + 'px');
          }
        }
        this._actualPlaceholder = this.placeholder;
      }
    } 
    else {
      this._actualPlaceholder = this.placeholder;
    }
  }

  _getCustomBorder() {
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
      let border = this._getCustomBorder();
      if(border && this.opened) {
        section.style.marginBottom = border + 'px';
      } else if(border) {
        section.style.marginBottom = '0';
      }
    }
  }

  close() {
    this.opened = false;
  }
  open() {
    this._setWidthInItems();
    this.opened = true;
  }
}