import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'studio-dark',
      values: [
        { name: 'studio-dark', value: '#0f0e17' },
        { name: 'studio-deep', value: '#151325' }
      ]
    }
  }
};

export default preview;
