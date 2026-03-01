import type { Meta, StoryObj } from '@storybook/react-vite';
import { Projects } from './Projects';

const meta: Meta<typeof Projects> = {
  title: 'Sections/Projects',
  component: Projects,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Projects>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1rem' }}>
      <Projects />
    </div>
  )
};
