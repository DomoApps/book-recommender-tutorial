import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'Dark', value: '#333' },
        { name: 'Light', value: '#F7F9F2' },
        { name: 'White', value: '#FFF' },
        { name: 'Cyan', value: 'cyan' },
      ],
      default: 'Light',
    },
    controls: {
      matchers: {
        date: /Date$/i,
      },
    },
  },
};

export default preview;
