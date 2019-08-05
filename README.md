# \<dile-select> & \<dile-select-multiple>

Web components to implement a select dropdown menu. ```<dile-select>``` implements a interface to select one single value.  ```<dile-select-multiple>``` implements a interface to select multiple values in a list.

## Installation

```bash
npm i dile-select
```

## \<dile-select> Usage

```html
<script type="module">
  import 'dile-select/dile-select.js';
</script>

<dile-select label="Favorite fruit:" value="pear" class="custom" placeholder="Select a fruit" @dile-select-changed="${this.selectChanged}">
  <dile-select-item value="kiwi">Kiwi fruit</dile-select-item>
  <dile-select-item value="pear">Pear</dile-select-item>
  <dile-select-item value="apple">Apple</dile-select-item>
  <dile-select-item value="orange">Orange</dile-select-item>
  <dile-select-item value="passion_fruit">True passion fruit</dile-select-item>
</dile-select>
```

## \<dile-select-multiple> Usage

```html
<script type="module">
  import 'dile-select/dile-select-multiple.js';
</script>

<dile-select-multiple placeholder="Select at least 1" label="Favorite cars">
  <dile-select-multiple-item value="general-motors">General Motors</dile-select-multiple-item>
  <dile-select-multiple-item value="volkswagen">Volkswagen</dile-select-multiple-item>
  <dile-select-multiple-item value="toyota">Toyota</dile-select-multiple-item>
  <dile-select-multiple-item value="fiat">Fiat</dile-select-multiple-item>
  <dile-select-multiple-item value="renault">Renault</dile-select-multiple-item>
</dile-select-multiple>
```

## Properties

### Properties specific for ```<dile-select>```

- **value** (String):  Stores the value of the selected item. Also Useful for the component initialization.
- **uninitialized**: When the component initializes, it takes the first option value as default. If uninitialized property is set to true, then the element do not initialize with any value. 

### Properties specific for ```<dile-select-multiple>```

- **value** (Array):  Stores the values of the selected items (array of strings). Also Useful for the component initialization.
- **labelNumItem**: For configure the selected text message. Something like "fruits selected" will show a message "3 fruits selected" when the user has selected 3 diferent options.
- **uninitialized**: Even the component has this property, it is unuseful in multiple select components, because there is not a default initialization, only the one you can apply with the ```value``` array property.

### Common properties for both components

- **name**: Name for the component. So, you can know which element element is related when a changed event is received.
- **opened**: This defines the component open / close state. the default placeholder is 'Select'.
- **selectedText**: Stores the innerText of the current selected option.
- **label**: A label for the element.
- **placeholder**: Placeholder. Appears when there isn't a selected element.
- **errored**: Display select in a error state 

## Methods

- **selectItem(value)**: this method is useful to select a item programaticaly. You should pass the string option value.
- **open()**: Opens the dropdown menu.
- **close()**: Closes the dropdown menu.

## events 

- **dile-select-changed**: dispatched when the select element changes it's current value. This custom event gives some useful data in the detail property.

## Custom properties 

CSS custom properties defined on ```<dile-select>```:

Custom property | Description | Default
----------------|-------------|---------
--dile-select-width | width of the select element | auto
--dile-select-text-color | Text color of the selected item | #303030
--dile-select-background-color | Background color of the selected item | #ddd
--dile-select-border-width| Border width of the interface. Only supports width in pixel units!! | 0
--dile-select-border-color | Border color of the interface | #888
--dile-select-border-radius | Border radius of the interface | 10px
--dile-select-hover-background-color | Background color when hover in a item | #eee
--dile-select-label-font-size| Label font size | 1em
--dile-select-label-color | Label text color | #59e
--dile-select-label-font-weight | Label font weight | normal
--dile-select-padding-x | Horizontal padding (left & right) of the items | 10px
--dile-select-padding-y | Vertical padding (top & bottom) of the items | 10px
--dile-select-errored-background-color | Error background color | #f66
--dile-select-errored-text-color | Error items text color | #fff

The component ```<dile-select-multiple>``` has the same CSS custom properties than ```<dile-select>```, and also:

Custom property | Description | Default
----------------|-------------|---------
--dile-select-multiple-unchecked-color | Color for the checkbox in unselected state | #aaa
--dile-select-multiple-checked-color | Color for the checkbox in selected state | #26e