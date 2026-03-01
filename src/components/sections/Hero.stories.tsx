import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1rem' }}>
      <Hero />
    </div>
  )
};
