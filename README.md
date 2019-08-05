# \<dile-select>

This webcomponent implements a select element. You can select one iten between several options with a dropdown menú.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i dile-select
```

## Usage

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

## Properties

- **value**: Stores the value of the selected item. Also Useful for the component initialization.
- **name**: Name for the component. So, you can know which element element is related when a changed event is received.
- **opened**: This defines the component open / close state. the default placeholder is 'Select'.
- **selectedText**: Stores the innerText of the current selected option.
- **label**: A label for the element.
- **placeholder**: Placeholder. Appears when there isn't a selected element.
- **uninitialized**: When the component initializes, it takes the first option value as default. If uninitialized property is set tu true, then the element do not initialize with any value.
- **errored**: Display select in a error state 

## Methods

- **selectItem(value)**: this method is useful to select a item programaticaly. You should pass the option value.
- **open()**: Opens the dropdown menu.
- **close()**: Closes the dropdown menu.

## events 

- **dile-select-changed**: dispatched when the select element changes it's current value.

Custom property | Description | Default
----------------|-------------|---------
--dile-select-width | width of the select element | auto
----dile-select-text-color | Text color of the selected item | #303030
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
