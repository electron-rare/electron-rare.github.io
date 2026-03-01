import type { Meta, StoryObj } from '@storybook/react-vite';
import { Contact } from './Contact';

const meta: Meta<typeof Contact> = {
  title: 'Sections/Contact',
  component: Contact,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Contact>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1rem' }}>
      <Contact />
    </div>
  )
};
