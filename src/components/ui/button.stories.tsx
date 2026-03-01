import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary CTA'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary CTA'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large CTA'
  }
};
