import { css } from 'lit-element';

export const dileSelectStyles = css`
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
  label {
    display: block;
    margin-bottom: 4px;
    font-size: var(--dile-select-label-font-size, 1em);
    color: var(--dile-select-label-color, #59e);
    font-weight: var(--dile-select-label-font-weight, normal);
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
    max-height: var(--dile-select-options-max-height, 250px);
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
    overflow-y: auto;
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
  div.errored {
    background-color: var(--dile-select-errored-background-color, #f66) !important;
    color: var(--dile-select-errored-text-color, #fff) !important;
  }  
`;