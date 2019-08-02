import { storiesOf, html, withKnobs, withClassPropertiesKnobs } from '@open-wc/demoing-storybook';

import { DileSelect } from '../src/DileSelect.js';
import '../dile-select.js';

storiesOf('dile-select', module)
  .addDecorator(withKnobs)
  .add('Documentation', () => withClassPropertiesKnobs(DileSelect))
  .add(
    'Alternative Title',
    () => html`
      <dile-select .title=${'Something else'}></dile-select>
    `,
  );
