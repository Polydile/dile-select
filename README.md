# \<dile-select>

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
