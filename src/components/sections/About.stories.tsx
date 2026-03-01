import type { Meta, StoryObj } from '@storybook/react-vite';
import { About } from './About';

const meta: Meta<typeof About> = {
  title: 'Sections/About',
  component: About,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof About>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1rem' }}>
      <About />
    </div>
  )
};
