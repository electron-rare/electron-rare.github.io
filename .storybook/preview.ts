import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

if (typeof document !== 'undefined') {
  // Align Storybook rendering with the site default (atelier) theme.
  document.documentElement.setAttribute('data-theme', 'light');
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'atelier',
      values: [
        { name: 'atelier', value: '#f4eee3' },
        { name: 'atelier-soft', value: '#fbf7ef' },
        { name: 'ink', value: '#0b0a09' }
      ]
    }
  }
};

export default preview;
