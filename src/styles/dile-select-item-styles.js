import { css } from 'lit-element';

export const dileSelectItemStyles = css`
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