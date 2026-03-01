import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-onboarding', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(typeof config.resolve.alias === 'object' ? config.resolve.alias : {}),
      '@': path.resolve(fileURLToPath(new URL('../src', import.meta.url)))
    };
    return config;
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
